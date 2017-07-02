<template>
    <section class="list-loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </section>
</template>

<script>
export default {
    name: 'listLoading',
    data() {
        return {};
    }
}
</script>

<style lang="scss">
.list-loading {
    width: 50px;
    height: 50px;
    position: relative;
    margin: 10px auto; 
    span {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #ed424b;
        position: absolute;
        transform: scale(.4);
        animation: load .8s ease infinite;
    }

    @keyframes load {
        0% {
            transform: scale(1.2);
            opacity: 1;
        }
        100% {
            transform: scale(.4);
            opacity: 0.5;
        }
    }

    span:nth-child(1) {
        left: 0;
        top: 50%;
        margin-top: -5px;
        animation-delay: 0.1s;
    }

    span:nth-child(2) {
        left: 6px;
        top: 6px;
        animation-delay: 0.2s;
    }

    span:nth-child(3) {
        left: 50%;
        top: 0;
        margin-left: -5px;
        animation-delay: 0.3s;
    }

    span:nth-child(4) {
        top: 6px;
        right: 6px;
        animation-delay: 0.4s;
    }

    span:nth-child(5) {
        right: 0;
        top: 50%;
        margin-top: -5px;
        animation-delay: 0.5s;
    }

    span:nth-child(6) {
        right: 6px;
        bottom: 6px;
        animation-delay: 0.6s;
    }

    span:nth-child(7) {
        bottom: 0;
        left: 50%;
        margin-left: -5px;
        animation-delay: 0.7s;
    }

    span:nth-child(8) {
        bottom: 6px;
        left: 6px;
        animation-delay: .8s;
    }
}
</style>


