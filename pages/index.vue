<template>
  <div class="max-w-4xl mx-auto">
    <div class="px-5">
      <div
        class="pt-10 md:pt-12 text-xl md:text-2xl text-gray-700 font-semibold"
      >
        추천 글
      </div>
    </div>

    <div class="max-w-4xl grid grid-cols-1 mt-6 md:mt-10 mb-5 px-4 md:px-0">
      <div
        class="
          shadow
          md:shadow-md
          rounded-2xl
          m-0
          md:mx-3 md:mb-6
          px-2
          md:px-6
          py-2.5
          md:py-6
          group
          bg-gradient-to-r
          from-blue-100
          via-gray-100
          to-gray-200
        "
        v-for="ftarticle of featured"
        :key="ftarticle"
      >
        <nuxt-link
          class="flex justify-between items-center"
          :to="{ name: 'slug', params: { slug: ftarticle.slug } }"
        >
          <div class="box hidden md:block">
            <img
              class="profile"
              :src="require(`~/assets/resources/${ftarticle.img}`)"
              alt=""
            />
          </div>
          <div class="py-3 md:py-4 px-3 md:px-6">
            <div>
              <p class="mb-1 md:mb-1 text-sm md:text-sm text-gray-400">
                {{ ftarticle.category }}
              </p>
              <h3
                class="
                  custom-text
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
                {{ ftarticle.title }}
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
                {{ ftarticle.description }}
              </p>
              <p class="text-sm md:text-sm text-gray-400">
                {{ ftarticle.datetime }}
              </p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>

    <div class="px-5 pt-6">
      <Search />
    </div>

    <div class="px-5">
      <div
        class="
          pt-8
          md:pt-11
          pb-4
          text-xl
          md:text-2xl
          text-gray-700
          font-semibold
        "
      >
        최근 업로드
      </div>
      <div class="text-gray-500 font-normal text-sm md:text-base">
        최근 업로드 된 글 모음입니다. 언어별로 글을 모아 보고 싶으시다면 상단의
        한글, ENG 버튼을 눌러주세요.
      </div>
    </div>

    <div class="px-5 pt-10">
      <nuxt-link to="front-end"
        ><span
          class="
            inline-block
            px-3
            py-1.5
            mr-1
            md:mr-2
            mb-2
            rounded-full
            bg-gray-100
            text-gray-400 text-sm
            transition
            hover:bg-gray-200 hover:duration-100
          "
          >#<span class="text-gray-600 text-sm">웹_개발</span></span
        ></nuxt-link
      >
      <nuxt-link to="data-science"
        ><span
          class="
            inline-block
            px-3
            py-1.5
            mr-1
            md:mr-2
            mb-2
            rounded-full
            bg-gray-100
            text-gray-400 text-sm
            transition
            hover:bg-gray-200 hover:duration-100
          "
          >#<span class="text-gray-600 text-sm">데이터</span></span
        ></nuxt-link
      >
      <nuxt-link to="projects"
        ><span
          class="
            inline-block
            px-3
            py-1.5
            mr-1
            md:mr-2
            mb-2
            rounded-full
            bg-gray-100
            text-gray-400 text-sm
            transition
            hover:bg-gray-200 hover:duration-100
          "
          >#<span class="text-gray-600 text-sm">프로젝트</span></span
        ></nuxt-link
      >
      <nuxt-link to="uncategorized"
        ><span
          class="
            inline-block
            px-3
            py-1.5
            mr-1
            md:mr-2
            mb-2
            rounded-full
            bg-gray-100
            text-gray-400 text-sm
            transition
            hover:bg-gray-200 hover:duration-100
          "
          >#<span class="text-gray-600 text-sm">무소속</span></span
        ></nuxt-link
      >
    </div>

    <div
      class="
        max-w-4xl
        grid grid-cols-1
        md:grid-cols-1
        mt-5
        md:mt-6
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
                  custom-text
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
    const featured = await $content("blog", params.slug)
      .where({ featured: "Featured" })
      .only([
        "title",
        "description",
        "img",
        "datetime",
        "category",
        "author",
        "slug",
      ])
      .sortBy("datetime", "desc")
      .fetch();
    return {
      articles,
      featured,
    };
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
.trygr{
    position: absolute;
    inset: 0px;
    z-index: -1;
    overflow: hidden;
    background-size: 200%;
    background-position: 0px 0px;
    background-image: linear-gradient(115deg, rgb(12, 0, 96), rgb(98, 89, 156), rgb(255, 247, 53));
    animation: 10s ease 0s infinite normal none running jYFErj;
}
</style>
