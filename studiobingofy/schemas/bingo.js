// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "bingo",
  title: "Bingo",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),

      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "brick",
      title: "Brickor",
      type: "array",
      of: [
        {
          title: "data",
          type: "object",
          fields: [
            {
              title: "Bricka",
              name: "title",
              type: "string",
              maxLength: 30,
            },
            {
              name: "image",
              title: "Bild",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              title: "Beskrivning",
              name: "description",
              type: "string",
              description: "Längre beskrivning om det önskas.",
            },
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Beskrivning",
      type: "string",
    },
  ],

  preview: {
    select: {
      title: "title",
    },
  },
};
