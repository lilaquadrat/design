import vue from 'vue';
import Component from 'vue-class-component';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Component({
  inheritAttrs: false,
})
export default abstract class FunctionalComponent<T> extends vue {

  props: T;

}
