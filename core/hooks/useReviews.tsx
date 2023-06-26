import { useState, useCallback, useEffect } from 'react';

import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

import type { UploadFile } from '@core/types/multimedia';
import type { Landing, ProductReview } from '@core/types/products';
import { scrollToSection } from '@core/utils/navigation';
import {
  createProductReview as createProductReviewMW,
  getAllProductReviews as getAllProductReviewsMW,
} from '@core/utils/products';

import { uploadConfig } from '@lib/config/multimedia.config';
import snackbarConfig from '@lib/config/snackbar.config';
import { useAppContext } from '@core/contexts/AppContext';
import { useAuthContext } from '@core/contexts/AuthContext';

const useReviews = (landing?: Landing) => {
  const { initialized, setLoading } = useAppContext();
  const { token, isLogged } = useAuthContext();

  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const createProductReview = useCallback(async (
    productReview: ProductReview,
    uploadImgs: UploadFile[],
    onSuccess?: () => void,
  ) => {
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    const reviewImg = uploadImgs.length >= 1 ? uploadImgs[0].file : undefined;
    createProductReviewMW(
      isLogged() ? token : '',
      intl.locale,
      productReview,
      reviewImg
    ).then((response) => {
      setReviews([response.review, ...reviews]);
      setCurrentPage(1);
      scrollToSection('reviews', false);
      setLoading(false);
      enqueueSnackbar(
        intl.formatMessage({ id: 'forms.productReview.success.default' }),
        { variant: 'success', autoHideDuration: snackbarConfig.durations.long }
      );
      if (onSuccess) {
        onSuccess();
      }
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('File size')) {
        errorMsg = intl.formatMessage({ id: 'forms.productReview.errors.fileSize' }, { maxSize: uploadConfig.maxSize });
      } else if (errorMsg.includes('You have to be logged to use this email')) {
        errorMsg = intl.formatMessage({ id: 'forms.productReview.errors.unlogged' });
      } else if (errorMsg.includes('You have not bought the related product') || errorMsg.includes('getting guest user')) {
        errorMsg = intl.formatMessage({ id: 'forms.productReview.errors.notBought' });
      } else {
        errorMsg = intl.formatMessage({ id: 'app.errors.default' });
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  }, [enqueueSnackbar, intl, isLogged, reviews, setLoading, token]);

  const handleChangePage = useCallback((_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    scrollToSection('reviews', false);
  }, []);

  const getAllProductReviews = useCallback(async (page: number) => {
    const limit = 10;
    const sortBy = 'id';
    const order = 'desc';
    await getAllProductReviewsMW(intl.locale, page, limit, sortBy, order, landing?.id)
      .then((response) => {
        console.log(response)
        setReviews(response.reviews);
        setTotalPages(response.totalPages);
      }).catch((_error: Error) => {
        setReviews([]);
      });
  }, [intl.locale, landing?.id]);

  useEffect(() => {
    if (initialized) {
      getAllProductReviews(currentPage);
    }
  }, [currentPage, getAllProductReviews, initialized]);

  return {
    successMsg,
    errorMsg,
    reviews,
    currentPage,
    totalPages,
    handleChangePage,
    createProductReview,
  };
};

export default useReviews;
