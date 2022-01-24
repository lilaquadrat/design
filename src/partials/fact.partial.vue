<template>
<section class="fact" :class="[variant, {hasPicture: picture}]">

    <picture-partial v-if="picture" v-bind="picture" />

    <textblock-partial v-bind="textblock" />

    <slot></slot>

</section>
</template>
<script lang="ts">
import Picture from '@interfaces/picture.interface';
import Textblock from '@interfaces/textblock.interface';
import { ExtPartial, Component, Prop } from '../libs/lila-partial';

@Component
export default class FactPartial extends ExtPartial {

  @Prop(Object) textblock: Textblock;

  @Prop(Object) picture: Picture;

}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.fact::v-deep {
    display: grid;

    figure {
        display: none;
    }

    @media @desktop {

        &.hasPicture {
            grid-template-columns: 15% 1fr;
            grid-column-gap: 20px;
        }

        figure {
            display: grid;
        }
    }

    img {
        max-width: 80px;
        max-height: 80px;
    }

}

.facts-module.module {

    &.variant2 {

        .fact {
            text-align: center;

            display: grid;

            max-width: 500px;

            grid-template-columns: 1fr;
            grid-template-rows: min-content;

            justify-content: start;
            align-content: start;

            gap: 20px;

            // &.hasPicture {
            //     grid-template-columns: 1fr;
            //     grid-template-rows: 1fr;
            // }

            .textblock {
                width: 100%;
                // background-color: @grey1;
                // .multi(padding, 12, 4, 4, 4);
                // margin-top: -40px;
            }

            figure {
                display: grid;
                position: relative;
                justify-self: center;

                .index(2);

                img {

                    min-width: 80px;
                    min-height: 80px;

                    max-width: 150px;

                }
            }

        }
    }
}
</style>
