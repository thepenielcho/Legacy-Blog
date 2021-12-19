<template>
    <div class="related max-w-3xl mx-auto py-10 md:py-16">

        <nuxt-link :to='`${article.categoryeng}`'><p class="text-base md:text-lg text-gray-400 text-center mb-2 hover:underline">{{article.category}}</p></nuxt-link>
        <h1 class="custom-text leading-snug md:leading-normal px-5 md:px-0 mb-2 text-2xl md:text-4xl text-center font-semibold text-gray-700 title">{{article.title}}</h1>
        <p class="text-base md:text-lg text-gray-500 text-center">{{article.datetime}} · by {{article.author}}</p>
        <img :src="require(`~/assets/resources/${article.img}`)" alt="" class="mt-6 mb-8 md:rounded-2xl md:my-10" />
        
        <nuxt-content :document="article" class="prose max-w-3xl custom-text px-6"/>

        <Prevnext :prev="prev" :next="next" />

    </div>
</template>

<script>
export default {
    async asyncData({ $content, params }) {
        const article = await $content('blog', params.slug)
        .fetch();

        const [prev, next] = await $content('blog')
        .only(['title', 'slug'])
        .sortBy('datetime', 'asc')
        .surround(params.slug)
        .fetch()

        return { article, prev, next }
    },

    head() {
        return {
            title: this.article.title,
            description: this.article.description,
            htmlAttrs: {
            lang: 'ko'
            },
            meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 't-type',
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
            hid: 'og-type',
            property: 'og:type',
            content: 'website'
            },
            {
            hid: 'og:title',
            property: 'og:title',
            content: this.article.title
            },
            {
            hid: 'og:description',
            property: 'og:description',
            content: this.article.description
            },
            {
            hid: 'og:image',
            property: 'og:image',
            // content: this.article.img
            content: `https://raw.githubusercontent.com/thepenielcho/Blog/main/assets/resources/${this.article.img}`
            },
            {
            hid: 'og:image:secure_url',
            property: 'og:image:secure_url',
            content: `https://raw.githubusercontent.com/thepenielcho/Blog/main/assets/resources/${this.article.img}`
            },
            {
            hid: 'og:image:alt',
            property: 'og:image:alt',
            content: this.article.title
            },
            {
            hid: 'og:url',
            name: 'og:url',
            content: `https://www.blog.penielcho.com/${this.$route.params.slug}`
            },
            // { name: 'format-detection', content: 'telephone=no' }
            ],
        }
    },
}
</script>

<style scpoed>
.custom-text{
    word-break: keep-all;
}
img {
    margin-left: auto;
    margin-right: auto;
}
</style>