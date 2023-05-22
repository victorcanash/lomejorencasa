import { PageTypes } from '@core/constants/navigation';

import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';

const CbdBlog = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'cbdBlog.metas.title',
          descriptionId: 'cbdBlog.metas.description',
        }}
        marginTop={true}
        texts={{
          title: {
            id: 'cbdBlog.h1',
          },
        }}
      />

      <CbdBlog />
    </>
  );
};

export default CbdBlog;
