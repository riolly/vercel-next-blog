import Layout from "../../components/layout";
import { getPostDetails, getSortedPostsData } from "../../lib/posts";
import Head from "next/dist/shared/lib/head";
import Date from "../../components/date";

import utilStyles from "../../styles/utils.module.css";

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const postIds = getSortedPostsData().map(({ id }) => ({
    params: { id },
  }));
  return { paths: postIds, fallback: false };
}

export async function getStaticProps({ params: { id } }) {
  const post = await getPostDetails(id);
  return {
    props: {
      post,
    },
  };
}
