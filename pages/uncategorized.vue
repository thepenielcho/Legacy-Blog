<template>
  <div class="max-w-4xl mx-auto">
    <div class="px-5">
        <div class="pt-12 pb-4 text-xl md:text-2xl text-gray-700 font-semibold">무소속 | Uncategorized</div>
        <div class="text-gray-500 font-normal text-sm md:text-base">카테고리에 넣기에 애매한 글 모음입니다.</div>
    </div>

    <div class="max-w-4xl grid grid-cols-1 md:grid-cols-1 mt-11 md:mt-12 mb-8 md:mb-12">
        <div class="px-5 md:px-6 group" v-for="article of articles" :key="article">
          <nuxt-link :to="{ name: 'slug', params: { slug: article.slug } }">
              <div class="article-inner flex justify-between border-t py-6 border-gray-200">
                <div class="w-full md:w-4/6">
                    <p class="mb-1 md:mb-1 text-sm md:text-sm text-gray-400">{{article.category}}</p>
                    <h3 class="mb-1 md:mb-1.5 text-lg md:text-xl font-semibold text-gray-700 transition group-hover:text-blue-500 group-hover:duration-500">{{ article.title }}</h3>
                    <p class="mb-1 md:mb-1.5 text-sm md:text-base text-gray-500 custom-text">{{article.description}}</p>
                    <p class="text-sm md:text-sm text-gray-400">{{ article.datetime }}</p>
                </div>
                <img class="hidden md:block h-auto w-3/12 rounded-2xl group-hover:shadow-lg transform group-hover:-translate-y-1 transition group-hover:duration-500"
                :src="require(`~/assets/resources/${article.img}`)" alt=""/>
              </div>
          </nuxt-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('blog', params.slug)
      .where({language: 'Korean'})
      .only(['title', 'description', 'img', 'datetime', 'category', 'author', 'slug'])
      // .sortBy('createdAt', 'asc')
      .sortBy('datetime', 'desc')
      .fetch();
    return {
      articles
    }
  },
  head: {
    title: 'Uncategorized | PenieLog',
    htmlAttrs: {
      lang: 'ko'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'This is PenieLog, Peniel Blog.' },
      { name: 'format-detection', content: 'telephone=no' }
    ]
  },
}
</script>

<style scoped>
.custom-text{
    word-break: keep-all;
}
</style>
