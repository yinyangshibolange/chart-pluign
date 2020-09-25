<template>
  <textarea id="textarea"></textarea>
</template>

<script>
// 引入全局实例
import _CodeMirror from "codemirror";

// 核心样式
import "codemirror/lib/codemirror.css";
// 引入主题后还需要在 options 中指定主题才会生效
import "codemirror/theme/cobalt.css";

// 需要引入具体的语法高亮库才会有对应的语法高亮效果
// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/r/r.js";
import "codemirror/mode/shell/shell.js";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/swift/swift.js";
import "codemirror/mode/vue/vue.js";
import { onMounted } from "vue";

import useCode from './useCode'

// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror;
export default {
  setup(props, context) {
    let mode = "javascript";
    const modes = [
      {
        value: "css",
        label: "CSS",
      },
      {
        value: "javascript",
        label: "Javascript",
      },
      {
        value: "html",
        label: "XML/HTML",
      },
      {
        value: "x-java",
        label: "Java",
      },
      {
        value: "x-objectivec",
        label: "Objective-C",
      },
      {
        value: "x-python",
        label: "Python",
      },
      {
        value: "x-rsrc",
        label: "R",
      },
      {
        value: "x-sh",
        label: "Shell",
      },
      {
        value: "x-sql",
        label: "SQL",
      },
      {
        value: "x-swift",
        label: "Swift",
      },
      {
        value: "x-vue",
        label: "Vue",
      },
      {
        value: "markdown",
        label: "Markdown",
      },
    ];

    let code = '';
    let coder;

    function _initialize(options) {
      const _textarea = document.getElementById("textarea");
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      coder = CodeMirror.fromTextArea(_textarea, options);
      // 编辑器赋值
      const value = props.value || code
      const codeRef = useCode(value)
      coder.setValue(props.value || code);
      // 支持双向绑定
      const self = this
      coder.on("change", (coder) => {
        code = coder.getValue();
        codeRef.value = code
      });

      // 尝试从父容器获取语法类型
      if (props.language) {
        // 获取具体的语法类型对象
        let modeObj = _getLanguage(props.language);
        // 判断父容器传入的语法是否被支持
        if (modeObj) {
          mode = modeObj.label;
        }
      }
    }
    // 获取当前语法类型
    function _getLanguage(language) {
      // 在支持的语法类型列表中寻找传入的语法类型
      return modes.find((mode) => {
        // 所有的值都忽略大小写，方便比较
        let currentLanguage = language.toLowerCase();
        let currentLabel = mode.label.toLowerCase();
        let currentValue = mode.value.toLowerCase();
        // 由于真实值可能不规范，例如 java 的真实值是 x-java ，所以讲 value 和 label 同时和传入语法进行比较
        return (
          currentLabel === currentLanguage || currentValue === currentLanguage
        );
      });
    }
    // 更改模式
    function changeMode(val) {
      // 修改编辑器的语法配置
      coder.setOption("mode", `text/${val}`);
      // 获取修改后的语法
      let label = _getLanguage(val).label.toLowerCase();
      // 允许父容器通过以下函数监听当前的语法值
      this.$emit("language-change", label);
    }

    onMounted(() => {
      const options = {
        // 缩进格式
        tabSize: 2,
        // 主题，对应主题库 JS 需要提前引入
        theme: "cobalt",
        // 显示行号
        lineNumbers: true,
        line: true,
      };
      _initialize(options);
    });
  },
};
</script>

<style>
.in-coder-panel {
  flex-grow: 1;
  display: flex;
  position: relative;
}
.CodeMirror {
  flex-grow: 1;
  z-index: 1;
}
.CodeMirror-code {
  line-height: 19px;
}
.code-mode-select {
  position: absolute;
  z-index: 2;
  right: 10px;
  top: 10px;
  max-width: 130px;
}
</style>
