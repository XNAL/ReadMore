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
    width: 20px;
    height: 20px;
    position: relative;
    margin: auto;
    span {
        display: inline-block;
        width: 4px;
        height: 4px;
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
        margin-top: -2px;
        animation-delay: 0.1s;
    }

    span:nth-child(2) {
        left: 2px;
        top: 2px;
        animation-delay: 0.2s;
    }

    span:nth-child(3) {
        left: 50%;
        top: 0;
        margin-left: -2px;
        animation-delay: 0.3s;
    }

    span:nth-child(4) {
        top: 2px;
        right: 2px;
        animation-delay: 0.4s;
    }

    span:nth-child(5) {
        right: 0;
        top: 50%;
        margin-top: -2px;
        animation-delay: 0.5s;
    }

    span:nth-child(6) {
        right: 2px;
        bottom: 2px;
        animation-delay: 0.6s;
    }

    span:nth-child(7) {
        bottom: 0;
        left: 50%;
        margin-left: -2px;
        animation-delay: 0.7s;
    }

    span:nth-child(8) {
        bottom: 2px;
        left: 2px;
        animation-delay: .8s;
    }
}
</style>
