<template>
  <ul class="api-wrap">
    <li v-if="!empty">
      <h3 v-if="name" :id="idName">{{ name }}</h3>
      <slot name="desc" v-if="desc || $slots.desc">
        <div v-html="desc"></div>
      </slot>
      <div v-if="doc.props && doc.props.length > 0">
        <h3 :id="`${idName}-props`">
          {{ name }} Props
          <a :href="`#${idName}-props`" class="anchor">#</a>
        </h3>
        <table class="table-props">
          <thead>
            <tr>
              <th class="th-name">{{ $t('api-head.name') }}</th>
              <th class="th-desc">{{ $t('api-head.desc') }}</th>
              <th class="th-type">{{ $t('api-head.type') }}</th>
              <th class="th-option">{{ $t('api-head.option') }}</th>
              <th class="th-default">{{ $t('api-head.default') }}</th>
              <th class="th-version">{{ $t('api-head.version') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(props, index) in doc.props" :key="index">
              <td class="td-name">{{ props.name }}</td>
              <td v-html="getTranslateContent(props.desc)"></td>
              <td class="td-type" v-html="Array.isArray(props.type) ? props.type.join(' / ') : props.type"></td>
              <td class="td-option">
                {{
                  props.optionalValue
                    ? Array.isArray(props.optionalValue)
                      ? props.optionalValue.join(' / ')
                      : props.optionalValue
                    : '-'
                }}
              </td>
              <td class="td-default" v-html="props.default || '-'"></td>
              <td class="td-version">{{ props.version || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <slot name="props-desc" v-if="$slots['props-desc']"></slot>
      <div v-if="doc.params && doc.params.length > 0">
        <h3 :id="`${idName}-params`">
          {{ name }} Params
          <a :href="`#${idName}-params`" class="anchor">#</a>
        </h3>
        <table class="table-props">
          <thead>
            <tr>
              <th class="th-name">{{ $t('api-head.name') }}</th>
              <th class="th-desc">{{ $t('api-head.desc') }}</th>
              <th class="th-type">{{ $t('api-head.type') }}</th>
              <th class="th-option">{{ $t('api-head.option') }}</th>
              <th class="th-default">{{ $t('api-head.default') }}</th>
              <th class="th-version">{{ $t('api-head.version') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(param, index) in doc.params" :key="index">
              <td class="td-name">{{ param.name }}</td>
              <td v-html="getTranslateContent(param.desc)"></td>
              <td class="td-type">
                {{ Array.isArray(param.type) ? param.type.join(' / ') : param.type }}
              </td>
              <td class="td-option">
                {{
                  param.optionalValue
                    ? Array.isArray(param.optionalValue)
                      ? param.optionalValue.join(' / ')
                      : param.optionalValue
                    : '-'
                }}
              </td>
              <td class="td-default">{{ param.default || '-' }}</td>
              <td class="td-version">{{ param.version || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="doc.slots && doc.slots.length > 0">
        <h3 :id="`${idName}-slots`">
          {{ name }} Slots
          <a :href="`#${idName}-slots`" class="anchor">#</a>
        </h3>
        <table class="table-slots">
          <thead>
            <tr>
              <th>{{ $t('api-head.name') }}</th>
              <th>{{ $t('api-head.desc') }}</th>
              <th class="th-version">{{ $t('api-head.version') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(slot, index) in doc.slots" :key="index">
              <td>{{ slot.name }}</td>
              <td v-html="getTranslateContent(slot.desc)"></td>
              <td class="td-version">{{ slot.version || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="doc.scopedSlots && doc.scopedSlots.length > 0">
        <h3 :id="`${idName}-scoped-slot`">
          {{ name }} Scoped Slot
          <a :href="`#${idName}-scoped-slot`" class="anchor">#</a>
        </h3>
        <table class="table-scoped-slots">
          <thead>
            <tr>
              <th class="th-name">{{ $t('api-head.name') }}</th>
              <th>{{ $t('api-head.mean') }}</th>
              <th class="th-param">{{ $t('api-head.param') }}</th>
              <th class="th-version">{{ $t('api-head.version') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(slot, index) in doc.scopedSlots" :key="index">
              <td>{{ slot.name }}</td>
              <td v-html="getTranslateContent(slot.desc)"></td>
              <td v-html="slot.args"></td>
              <td class="td-version">{{ slot.version }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="doc.events && doc.events.length > 0">
        <h3 :id="`${idName}-events`">
          {{ name }} Events
          <a :href="`#${idName}-events`" class="anchor">#</a>
        </h3>
        <table class="table-events">
          <thead>
            <tr>
              <th>{{ $t('api-head.event-name') }}</th>
              <th>{{ $t('api-head.desc') }}</th>
              <!-- <th>{{ $t('api-head.event-signature') }}</th> -->
              <th class="th-param">{{ $t('api-head.param') }}</th>
              <th class="th-version">{{ $t('api-head.version') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(event, index) in doc.events" :key="index">
              <td class="td-name">{{ event.name }}</td>
              <td v-html="getTranslateContent(event.desc)"></td>
              <!-- <td>{{ event.signature }}</td> -->
              <td class="td-param">{{ event.args || '-' }}</td>
              <td class="td-version">{{ event.version || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="doc.methods && doc.methods.length > 0">
        <h3 :id="`${idName}-methods`">
          {{ name }} Methods
          <a :href="`#${idName}-methods`" class="anchor">#</a>
        </h3>
        <table class="table-methods">
          <thead>
            <tr>
              <th class="th-name">{{ $t('api-head.method-name') }}</th>
              <th>{{ $t('api-head.desc') }}</th>
              <!-- <th>方法签名</th> -->
              <th class="th-param">{{ $t('api-head.param') }}</th>
              <th class="th-version">{{ $t('api-head.version') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(method, index) in doc.methods" :key="index">
              <td class="td-name">{{ method.name }}</td>
              <td v-html="getTranslateContent(method.desc)"></td>
              <!-- <td>{{ method.signature }}</td> -->
              <td class="td-param">{{ method.args || '-' }}</td>
              <td class="td-version">{{ method.version || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="doc.staticMethods && doc.staticMethods.length > 0">
        <h3 :id="`${idName}-staitc-methods`">
          {{ name }} Static Methods
          <a :href="`#${idName}-staitc-methods`" class="anchor">#</a>
        </h3>
        <table class="table-methods">
          <thead>
            <tr>
              <th class="th-name">{{ $t('api-head.method-name') }}</th>
              <th>{{ $t('api-head.desc') }}</th>
              <!-- <th>方法签名</th> -->
              <th class="th-param">{{ $t('api-head.param') }}</th>
              <th class="th-version">{{ $t('api-head.version') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(method, index) in doc.staticMethods" :key="index">
              <td class="td-name">{{ method.name }}</td>
              <td v-html="getTranslateContent(method.desc)"></td>
              <!-- <td>{{ method.signature }}</td> -->
              <td class="td-param">{{ method.args || '-' }}</td>
              <td class="td-version">{{ method.version || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.api-wrap {
  list-style: none;
  padding-left: 0;
  table {
    width: 100%;
    margin-bottom: 45px;
    table-layout: fixed;
  }
  th {
    font-weight: 500;
    white-space: nowrap;
  }
  th,
  td {
    text-align: left;
    padding: 20px 10px;
    line-height: 20px;
    border-bottom: 1px solid #edf0f7;
  }
}

.th-option,
.td-option {
  // max-width: 170px;
}

.th-name,
.td-name {
  width: 120px;
}
.th-type,
.td-type {
  width: 150px;
}
.th-param,
.td-param,
.th-default,
.td-default {
  width: 200px;
}
.th-version,
.td-version {
  width: 60px;
}
</style>

<script>
export default {
  name: 'ApiDoc',
  props: {
    doc: {
      type: Object,
      default: () => {},
    },
    name: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
    },
  },

  computed: {
    empty() {
      return !Object.keys(this.doc).length;
    },
    tt() {
      return this.$t;
    },
    idName() {
      let name = this.name.replace(/([A-Z])/g, function (matched) {
        return '-' + matched[0].toLowerCase();
      });
      if (name[0] === '-') {
        name = name.substr(1);
      }
      return name;
    },
  },
  methods: {
    getTranslateContent(desc) {
      return desc.replace(/\$t\('(.*)'\)/, ($0, $1) => {
        return this.$t($1);
      });
    },
  },
};
</script>
