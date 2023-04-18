import { useState, useCallback, useEffect } from 'react';

import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

import type { UploadFile } from '@core/types/multimedia';
import type {
  ProductReview,
  CreateProductReview,
} from '@core/types/products';
import { scrollToSection } from '@core/utils/navigation';
import {
  createProductReview as createProductReviewMW,
  getAllProductReviews as getAllProductReviewsMW,
} from '@core/utils/products';

import { uploadImgMaxSize } from '@lib/constants/multimedia';
import snackbarConfig from '@lib/constants/snackbar';
import { useAppContext } from '@lib/contexts/AppContext';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import { useAuthContext } from '@lib/contexts/AuthContext';

const useReviews = () => {
  const { setLoading } = useAppContext();
  const {
    listProductReviews,
    setListProductReviews,
    setProductRating,
  } = useProductsContext();
  const { token, isLogged } = useAuthContext();

  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const createProductReview = useCallback(async (
    productReview: CreateProductReview,
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
        setListProductReviews({
          ...listProductReviews,
          reviews: [response.review, ...listProductReviews.reviews],
        })
        setProductRating(
          response.review.product,
          response.productRating.rating,
          response.productRating.reviewsCount
        );
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
          errorMsg = intl.formatMessage({ id: 'forms.productReview.errors.fileSize' }, { maxSize: uploadImgMaxSize });
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
  }, [enqueueSnackbar, intl, isLogged, listProductReviews, setListProductReviews, setLoading, setProductRating, token]);

  const handleChangePage = useCallback((_event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    setTotalPages(listProductReviews.totalPages);
    scrollToSection('reviews', false);
  }, [listProductReviews.totalPages]);

  const getAllProductReviews = useCallback(async () => {
    const limit = 10;
    const sortBy = 'id';
    const order = 'desc';
    await getAllProductReviewsMW(intl.locale, page, limit, sortBy, order)
      .then((response: { reviews: ProductReview[], totalPages: number, currentPage: number }) => {
        setListProductReviews({
          reviews: response.reviews,
          totalPages: response.totalPages,
          currentPage: response.currentPage,
        });
      }).catch((_error: Error) => {
        setListProductReviews({
          reviews: [],
          totalPages: totalPages,
          currentPage: page,
        })
      });
  }, [intl.locale, page, setListProductReviews, totalPages]);

  useEffect(() => {
    getAllProductReviews();
  }, [getAllProductReviews]);

  return {
    successMsg,
    errorMsg,
    handleChangePage,
    createProductReview,
  };
};

export default useReviews;
