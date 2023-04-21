import dayjs from 'dayjs';
import 'dayjs/locale/de';
import relativeTime from 'dayjs/plugin/relativeTime';

import vue from 'vue';

dayjs.extend(relativeTime);

dayjs.locale('de');

vue.filter('moment', (value: Date, format: string, fromNow?: boolean) => (!fromNow ? dayjs(value).format(format) : dayjs(value).fromNow()));
