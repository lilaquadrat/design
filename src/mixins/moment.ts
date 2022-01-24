import dayjs from 'dayjs';
import 'dayjs/locale/de';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

dayjs.locale('de');

import vue from 'vue';

vue.filter('moment', (value: Date, format: string, fromNow?: boolean) => {
    return !fromNow ? dayjs(value).format(format) : dayjs(value).fromNow();
});
