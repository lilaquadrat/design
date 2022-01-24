import vue from 'vue';

vue.filter('leadingZero', (value: string, minLength: number) => value.toString().padStart(minLength, '0'));
