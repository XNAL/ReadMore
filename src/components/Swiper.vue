<template>
    <section class="swiper-banner">
      <swiper :options="swiperOption">
        <swiper-slide v-for="slide in swiperSlides" :key="slide._id">
            <router-link :to="{ name: slide.link, params: {} }">
                <img :src="slide.img" :alt="slide.title">
            </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </section>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import api from '../fetch/api';

export default {
    name: 'swipers',
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            swiperSlides: [],
            swiperOption: {
                pagination: '.swiper-pagination',
				slidesPerView: 1,
				autoplay: 5000,
				paginationClickable: true,
				spaceBetween: 30,
				loop: true
            }
        }
    },
    created() {
        api.getSwiperPictures()
            .then(data => {
                this.swiperSlides = data;
            })
    }
 }
</script>

<style lang="scss">
.swiper-banner {
    width: 100%;
    height: 120px;

    .swiper-container {
        height: 100%;
        width: 100%;
    }

    img {
        height: 100%;
        width: 100%;
    }
}
</style>
