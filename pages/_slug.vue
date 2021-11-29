<template>
    <div class="related max-w-3xl mx-auto py-10 md:py-16">
        <!-- <SocialHead
        :title="article.title"
        :description="article.description"
        :image="article.img"
        /> -->

        <nuxt-link :to='`${article.categoryeng}`'><p class="text-base md:text-lg text-gray-400 text-center mb-2 hover:underline">{{article.category}}</p></nuxt-link>
        <h1 class="custom-text leading-snug md:leading-normal px-5 md:px-0 mb-2 text-2xl md:text-4xl text-center font-semibold text-gray-700 title">{{article.title}}</h1>
        <p class="text-base md:text-lg text-gray-500 text-center">{{article.datetime}} · by {{article.author}}</p>
        <img :src="require(`~/assets/resources/${article.img}`)" alt="" class="mt-6 mb-8 md:rounded-2xl md:my-10" />
        
        <nuxt-content :document="article" class="prose max-w-3xl custom-text px-6"/>

        <!-- <nuxt-link :to="`https://www.blog.penielcho.com/${this.$route.params.slug}`">Link</nuxt-link> -->

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
            desciption: this.article.desciption,
            htmlAttrs: {
            lang: 'ko'
            },
            meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            // {
            // hid: 'twitter:title',
            // name: 'twitter:title',
            // content: this.article.title
            // },
            // {
            // hid: 'twitter:description',
            // name: 'twitter:description',
            // content: this.article.description
            // },
            {
                hid: 't-type',
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            // {
            // hid: 'twitter:image',
            // name: 'twitter:image',
            // content: this.article.img
            // },
            // {
            // hid: 'twitter:image:src',
            // name: 'twitter:image:src',
            // content: this.article.img
            // },
            // {
            // hid: 'twitter:image:alt',
            // name: 'twitter:image:alt',
            // content: this.article.title
            // },
            // {
            // hid: 'twitter:url',
            // name: 'twitter:url',
            // content: `https://www.blog.penielcho.com/${this.$route.params.slug}`
            // },
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
            // { hid: 'description', name: 'description', content: 'This is PENIELog, Peniel Blog.' },
            // { name: 'format-detection', content: 'telephone=no' }
            ],
            // link: [
            //     {
            //     hid: 'canonical',
            //     rel: 'canonical',
            //     href: `https://www.blog.penielcho.com/${this.$route.params.slug}`
            //     }
            // ]
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