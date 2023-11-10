// import { PageTypes } from '@core/constants/navigation';

import usePage from '@core/hooks/usePage'
// import PageHeader from '@core/components/pages/PageHeader';
// import CbdBlog from '@components/blogs/cbd';

const CbdBlogPage = () => {
  usePage()

  return (
    <>
      {/* <PageHeader
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

      <CbdBlog /> */}
    </>
  )
}

export default CbdBlogPage
