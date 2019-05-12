import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Bio from 'src/components/Bio';
import Layout from 'src/components/Layout';
import SEO from 'src/components/SEO';
import { rhythm } from 'src/utils/typography';

const propTypes = {
    data: PropTypes.shape({}).isRequired,
    location: PropTypes.shape({}).isRequired,
};

function BlogIndex({ data, location }) {
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                title="All posts"
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
            />{' '}
            <Bio />{' '}
            {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug;
                return (
                    <div key={node.fields.slug}>
                        <h3
                            style={{
                                marginBottom: rhythm(1 / 4),
                            }}
                        >
                            <Link
                                style={{
                                    boxShadow: `none`,
                                }}
                                to={node.fields.slug}
                            >
                                {' '}
                                {title}{' '}
                            </Link>{' '}
                        </h3>{' '}
                        <small> {node.frontmatter.date} </small>{' '}
                        <p
                            dangerouslySetInnerHTML={{
                                __html:
                                    node.frontmatter.description ||
                                    node.excerpt,
                            }}
                        />{' '}
                    </div>
                );
            })}{' '}
        </Layout>
    );
}

BlogIndex.propTypes = propTypes;

export default BlogIndex;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    excerpt
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        description
                    }
                }
            }
        }
    }
`;
