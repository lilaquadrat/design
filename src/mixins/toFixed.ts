import vue from 'vue';

vue.filter('toFixed', (value: number, maxLength: number) => {
    return value.toFixed(maxLength);
});
