import vue from 'vue';

vue.filter('toFixed', (value: number, maxLength: number) => value.toFixed(maxLength));
