<template>
    <div class="w-full p-3 border-b md:border-b border-gray-200">
        <div class="max-w-4xl mx-auto flex items-center justify-between">

            <div class="ml-1.5 md:ml-0">
                <nuxt-link to="/">
                    <HeaderLogo />
                </nuxt-link>
            </div>

            <div class="">
                <ul class="flex space-x-1 text-base items-center">
                    <li>
                        <div class="py-1 px-2 rounded-lg hover:bg-gray-100">
                            <nuxt-link to="korean" class="text-gray-700 text-sm">한글</nuxt-link>
                        </div>
                    </li>
                    <!-- <li class="text-gray-700 mx-auto">|</li> -->
                    <li>
                        <div class="py-1 px-2 rounded-lg hover:bg-gray-100">
                            <nuxt-link to="english" class="text-gray-700 text-sm">ENG</nuxt-link>
                        </div>
                    </li>
                    <li>
                        <div class="hidden md:block group pl-4">
                            <a href="https://github.com/thepenielcho" target="blank" class="">
                                <GithubLogo />
                            </a>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
    };
</script>

<style scoped>

</style>