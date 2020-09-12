<template lang="pug">
  .editor.py-4
    editor-menu-bar.px-4.pb-3(:editor='editor', v-slot='{ commands, isActive }')
      .menubar
        v-btn.mr-1(fab dark small color="black" :class="{ 'is-active': isActive.bold() }", @click='commands.bold')
          i.fa.fa-bold
        v-btn.mr-1(fab dark small color="black" :class="{ 'is-active': isActive.italic() }", @click='commands.italic')
          i.fa.fa-italic
        v-btn.mr-1(fab dark small color="black" :class="{ 'is-active': isActive.strike() }", @click='commands.strike')
          i.fa.fa-strikethrough
        v-btn.mr-1(fab dark small color="black" :class="{ 'is-active': isActive.underline() }", @click='commands.underline')
          i.fa.fa-underline
        v-btn.mr-1(fab dark small color="black" :class="{ 'is-active': isActive.code() }", @click='commands.code')
          i.fa.fa-code
        //- v-btn.mr-1(fab dark small color="black" :class="{ 'is-active': isActive.paragraph() }", @click='commands.paragraph')
        //-   icon(name='paragraph')
        v-btn.mr-1(fab dark small color="black" :class="{ 'is-active': isActive.heading({ level: 1 }) }", @click='commands.heading({ level: 1 })')
          | H1
        //- v-btn.mr-1(fab dark small color="black" :class="{ 'is-active': isActive.heading({ level: 2 }) }", @click='commands.heading({ level: 2 })')
        //-   | H2
        //- v-btn.mr-1(fab dark small color="black" :class="{ 'is-active': isActive.heading({ level: 3 }) }", @click='commands.heading({ level: 3 })')
        //-   | H3
        v-btn.mr-1(fab dark small color="black" :class="{ 'is-active': isActive.bullet_list() }", @click='commands.bullet_list')
          i.fa.fa-list-ul
        v-btn.mr-1(fab dark small color="black" :class="{ 'is-active': isActive.ordered_list() }", @click='commands.ordered_list')
          i.fa.fa-list-ol
        v-btn.mr-1(fab dark small color="black" :class="{ 'is-active': isActive.blockquote() }", @click='commands.blockquote')
          i.fa.fa-quote-right
        //- v-btn.mr-1(fab dark small color="black" :class="{ 'is-active': isActive.code_block() }", @click='commands.code_block')
        //-   icon(name='code')
        v-btn.mr-1(fab dark small color="black" @click='commands.horizontal_rule')
          | --
        v-btn.mr-1(fab dark small color="black" @click='commands.undo')
          i.fa.fa-undo
        //- v-btn.mr-1(fab dark small color="black" @click='commands.redo')
        //-   i.fa.fa-redo
    editor-content.px-4.editor__content(:editor='editor')

</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

export default {
  props: {
    value: { type: String, required: true },
  },

  watch: {
    value(newHtml) {
      if (this.emitAfterOnUpdate) {
        this.emitAfterOnUpdate = false
        return
      }
      this.editor.setContent(newHtml)
    },
  },

  components: {
    EditorContent,
    EditorMenuBar,
  },

  data() {
    return {
      emitAfterOnUpdate: false,

      editor: new Editor({
        onUpdate: ({ getHTML }) => {
          this.emitAfterOnUpdate = true
          this.$emit('input', getHTML())
        },
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: this.value,
      }),
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style>
.menubar__button {
  padding: 0.25rem;
  margin-right: 0.25rem;
}

li > p:first-child {
  display: inline;
}
</style>
