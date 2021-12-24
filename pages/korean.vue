<template>
  <div class="max-w-4xl mx-auto">
    <div class="px-5">
      <div class="pt-12 pb-4 text-xl md:text-2xl text-gray-700 font-semibold">
        한글 | Korean
      </div>
      <div class="text-gray-500 font-normal text-sm md:text-base">
        한글로 작성된 글 모음입니다. 영어로 작성된 글들과 번역 관계에 있지는
        않습니다.
      </div>
    </div>

    <div
      class="
        max-w-4xl
        grid grid-cols-1
        md:grid-cols-1
        mt-11
        md:mt-12
        mb-8
        md:mb-12
      "
    >
      <div
        class="px-5 md:px-6 group"
        v-for="article of articles"
        :key="article"
      >
        <nuxt-link :to="{ name: 'slug', params: { slug: article.slug } }">
          <div
            class="
              article-inner
              flex
              justify-between
              border-t
              py-6
              border-gray-200
            "
          >
            <div class="w-full md:w-4/6">
              <p class="mb-1 md:mb-1 text-sm md:text-sm text-gray-400">
                {{ article.category }}
              </p>
              <h3
                class="
                  mb-1
                  md:mb-1.5
                  text-lg
                  md:text-xl
                  font-semibold
                  text-gray-700
                  transition
                  group-hover:text-blue-500 group-hover:duration-500
                "
              >
                {{ article.title }}
              </h3>
              <p
                class="
                  mb-1
                  md:mb-1.5
                  text-sm
                  md:text-base
                  text-gray-500
                  custom-text
                "
              >
                {{ article.description }}
              </p>
              <p class="text-sm md:text-sm text-gray-400">
                {{ article.datetime }}
              </p>
            </div>
            <div
              class="
                sbox
                hidden
                md:block
                group-hover:shadow-lg
                transform
                group-hover:-translate-y-1
                transition
                group-hover:duration-500
              "
            >
              <img
                class="profile"
                :src="require(`~/assets/resources/${article.img}`)"
                alt=""
              />
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content("blog", params.slug)
      .where({ language: "Korean" })
      .only([
        "title",
        "description",
        "img",
        "datetime",
        "category",
        "author",
        "slug",
      ])
      // .sortBy('createdAt', 'asc')
      .sortBy("datetime", "desc")
      .fetch();
    return {
      articles,
    };
  },
  head: {
    title: "Korean Articles | PENIELog",
    htmlAttrs: {
      lang: "ko",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "This is PENIELog, Peniel Blog.",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
  },
};
</script>

<style scoped>
.custom-text {
  word-break: keep-all;
}
.box {
  width: 269.13px;
  height: 164px;
  border-radius: 0.75rem;
  overflow: hidden;
}
.sbox {
  width: 212px;
  height: 141.33px;
  border-radius: 0.75rem;
  overflow: hidden;
}
.profile {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
