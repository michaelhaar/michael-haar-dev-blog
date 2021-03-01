
/** @jsx jsx */

import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { jsx, Link as TLink } from "theme-ui"
import kebabCase from "lodash.kebabcase"
import { Box, Flex } from "@theme-ui/components"
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes"
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config"

const MAX_TAG_COUNT = 5

type TagProps = {
  fieldValue: string,
  totalCount: number
}

export default function PopularTags({ children }) {
  const { basePath, blogPath, tagsPath } = useMinimalBlogConfig()
  const data = useStaticQuery(
    graphql`
      query {
        allPost(sort: { fields: tags___name, order: DESC }) {
          group(field: tags___name) {
            fieldValue
            totalCount
          }
        }
      }
    `
  )

  const sortedTags = data.allPost.group.sort((a, b) => b.totalCount - a.totalCount)
  const popularTags = sortedTags.slice(0, MAX_TAG_COUNT)
	return (
    <section sx={{ mb: [5, 6, 7] }}>
      <Box mt={[4, 5]}>
        {popularTags.map((listItem) => (
          <Flex key={listItem.fieldValue} mb={[1, 1, 2]} sx={{ alignItems: `center` }}>
            <TLink
              as={Link}
              sx={{ variant: `links.listItem`, mr: 2 }}
              to={replaceSlashes(`/${basePath}/${tagsPath}/${kebabCase(listItem.fieldValue)}`)}
            >
              {listItem.fieldValue} <span sx={{ color: `secondary` }}>({listItem.totalCount})</span>
            </TLink>
          </Flex>
        ))}
      </Box>
      </section>
	)
}