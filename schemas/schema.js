// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      name: "author",
      type: "document",
      title: "Author",
      fields: [
        {
          name: "name",
          title: "Name",
          type: "string",
        },
        {
          name: "avatar",
          title: "Avatar",
          type: "image",
        },
      ],
    },
    {
      name: "category",
      title: "Category",
      type: "document",
      fields: [
        {
          name: "title",
          title: "Category Name",
          type: "string",
        },
        {
          name: "slug",
          title: "Slug",
          type: "slug",
          options: {
            source: "title",
          },
        },
      ],
    },
    {
      name: "blog",
      type: "document",
      title: "Blog",
      fields: [
        {
          name: "title",
          type: "string",
          title: "Title",
        },
        {
          name: "slug",
          type: "slug",
          title: "Slug",
          options: {
            source: "title",
            maxLength: 200,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "subtitle",
          type: "string",
          title: "Subtitle",
        },
        {
          name: "coverImage",
          title: "Cover Image",
          type: "image",
          fields: [
            {
              type: "text",
              name: "alt",
              title: "Description",
            },
          ],
          options: {
            hotspot: true,
          },
        },
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [
            {
              type: "block",
            },
            {
              type: "image",
              fields: [
                {
                  title: "Image Position",
                  name: "position",
                  type: "string",
                  options: {
                    list: [
                      {
                        title: "Left",
                        value: "left",
                      },
                      {
                        title: "Center",
                        value: "center",
                      },
                      {
                        title: "Right",
                        value: "right",
                      },
                    ],
                    layout: "radio",
                    isHighlighted: true,
                  },
                },
                {
                  type: "text",
                  name: "alt",
                  title: "Description",
                  options: {
                    isHighlighted: true,
                  },
                },
              ],
              options: {
                hotspot: true,
              },
            },
            {
              name: "command",
              title: "Command",
              type: "code",
              options: {
                withFilename: false,
              },
            },
            {
              name: "code",
              title: "Code",
              type: "code",
              options: {
                withFilename: true,
              },
            },
          ],
        },
        {
          name: "date",
          title: "Date",
          type: "datetime",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "author",
          title: "Author",
          type: "reference",
          to: [{ type: "author" }],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "categories",
          title: "Categories",
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
    },
  ]),
});
