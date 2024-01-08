<template>
  <section :id="id" class="lila-compare-module lila-module">

    <lila-textblock-partial v-bind="textblock" />

    <section v-if="modifiedElements" class="compare-container">

      <ul class="legend">
        <li v-for="(head, index) in legend" :key="`headline-${index}`">
          <h3>{{ index + 1 }}*</h3>
          <h3>{{ head.headline }}</h3>
        </li>
      </ul>

      <table>

        <tbody>

          <tr :class="{ head: lineIndex === 0, group: line.length === 1 }" :style="amountStyle"
            v-for="(line, lineIndex) in modifiedElements" :key="`elements-${lineIndex}`">

            <td :class="{ structure: singleIndex === 0 }" :colspan="elementsLength(line.length === 1)"
              v-for="(single, singleIndex) in line" :key="`line-${singleIndex}`">

              <template v-if="single.headline || single.description">
                <h3 :title="single.headline" v-if="single.headline">{{ single.headline }}</h3>
                <p v-if="single.description">{{ single.description }}</p>
                <h4 class="index">{{ singleIndex }}*</h4>
              </template>
              <template v-else>
                <lila-icons-partial type="checked" size="small" v-if="single === 'yes'"
                  class="icon checkbox-checked_color1">yes</lila-icons-partial>
                <lila-icons-partial type="close" size="small" v-else-if="single === 'no'"
                  class="icon cancel_color1">no</lila-icons-partial>
                <template v-else><abbr :title="single">{{ single }}</abbr></template>
              </template>

            </td>

          </tr>

        </tbody>

      </table>

    </section>

  </section>
</template>
<script setup lang="ts">
/* __vue_virtual_code_placeholder__ */
import type Textblock from '@interfaces/textblock.interface';
import type CompareElement from '@interfaces/CompareElement.interface';
import type CompareStructure from '@interfaces/CompareStructure.interface';
import type CompareModified from '@interfaces/CompareModified.interface';
import type { CompareHeadline } from '@interfaces/CompareModified.interface';
import { computed } from 'vue';


const props = defineProps<{
  textblock: Textblock;

  elements: CompareElement[];

  structure: CompareStructure[];
  id?: string;
}>();
const modifiedElements=computed(() => {

  const data: CompareModified[] = [];
  const headline: (CompareHeadline | string)[] = [''];

  props.elements?.forEach((element) => {

    headline.push({ headline: element.headline, description: element.description } as CompareHeadline);

  });

  data.push(headline);
  props.structure?.forEach((structure, index) => {

    data.push([{ headline: structure.headline, description: structure.description, structure: true }]);
    structure.list?.forEach((list: any, listIndex: string | number) => {

      const newLine = [];

      newLine.push(list);

      props.elements?.forEach((element) => {

        let value: string | { [key: string]: string } = '';

        if (element.elements?.[index]) {

          if (element.elements[index][listIndex]) {

            const newValue = element.elements[index][listIndex];

            value = newValue;

          }

        }

        newLine.push(value);

      });

      data.push(newLine);

    });

  });

  return data;

});
const legend=computed(() => {

  return modifiedElements.value[0].slice(1);

});
const amountStyle=computed(() => {

  return {
    '--amount': props.elements.length,
  };

});

function elementsLength (getLength: boolean) {

  return getLength ? props.elements.length + 1 : false;

}

// eslint-disable-next-line class-methods-use-this
function componentType (lineIndex: number) {

  if (lineIndex === 0) return 'h3';

  return 'td';

}


</script>
<style lang="less" scoped>


.lila-compare-module {
  .module;
  .modulePadding();
  .headlines;

  display: grid;
  justify-items: center;
  gap: 40px;

  .lila-textblock::v-deep {
    max-width: @desktopWidth;
  }

  .compare-container {

    max-width: @desktopWidthExt;

    .legend {
      .multi(margin-bottom, 12);

      li {

        display: grid;
        grid-template-columns: 40px 1fr;

        h3 {
          .font-head;
          color: @color1;
          text-transform: uppercase;
        }
      }

      @media @tablet,
      @desktop {
        display: none;
      }
    }

    table {

      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;

      tr {

        &.head {
          td {
            text-align: center;

            h3,
            p {
              display: none;
            }

            h4 {
              .font-head;
              color: @color1;
            }

            @media @tablet,
            @desktop {

              h3,
              p {
                display: block;

              }

              h4 {
                display: none;
              }

            }

          }

        }

        td {

          .multi(padding, 4, 1);

          border-bottom: solid 1px @grey;
          border-top: solid 1px @grey;

          width: calc(75% / var(--amount));
          text-align: center;
          text-overflow: ellipsis;
          overflow: hidden;

          .icon {
            display: inline;
          }

          h3,
          p {
            word-break: break-all;
          }

          h3 {
            .font-head;
            color: @color1;
            text-transform: uppercase;

            &.index {

              @media @tablet,
              @desktop {
                display: none
              }

            }
          }

          h3+p {
            .multi(margin-top, 1);
          }

          &:nth-child(even) {
            background-color: @grey1;
          }

          &.structure {

            width: 25%;
            text-align: left;

            h4 {
              display: none;
            }

          }

        }

        &.head {
          td {
            .multi(padding, 0);
          }
        }

        &.group {

          td,
          td.structure {
            width: 100%;
          }

        }

        &.group,
        &.head {
          td {
            border: 0;

            &:nth-child(even) {
              background-color: transparent;
            }

          }
        }
      }

    }

  }

}</style>
