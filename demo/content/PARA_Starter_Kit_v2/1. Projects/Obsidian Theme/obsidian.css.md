/* Special Font */
body, p {
    font-family: "Dank Mono",'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Microsoft YaHei Light", sans-serif;
}

.cm-s-obsidian {
    font-family: "Dank Mono",'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Microsoft YaHei Light", sans-serif;
    font-size: 16px;
}

.editor {
    font-family: "Dank Mono",'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Microsoft YaHei Light", sans-serif;
    font-size: 16px;
}

.markdown-preview-view code {
    font-family: "Dank Mono",'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Microsoft YaHei Light", sans-serif;
    font-size: 16px;
}

.preview {
    font-family: "Dank Mono",'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Microsoft YaHei Light", sans-serif;
    font-size: 16px;
}

/* Scrollbar */
::-webkit-scrollbar {
    background-color: transparent;
}

/**/
/* Editor Section */
/**/
/* Line size */
.cm-s-obsidian pre.HyperMD-header {
    line-height: 1!important;
}

/* Selection */
.theme-light {
    --text-selection: rgba(112, 93, 207, 0.5);
}

.theme-dark {
    --text-selection: rgba(112, 93, 207, 0.5);
}

::selection {
    background-color: #705dcf;
    color: white;
}

/* Title */
/* Current main pane */
.view-header-title {
    color: #705dcf;
    text-align: center;
}

.workspace-leaf.mod-active .view-header {
    text-align: center;
}
/* Other pane */
.workspace-leaf-header-title-container {
    text-align: center;
}

/* Headers */
span.cm-formatting.cm-formatting-header.cm-formatting-header-1.cm-header.cm-header-1 {
    color: #705dcf;
}

span.cm-formatting.cm-formatting-header.cm-formatting-header-2.cm-header.cm-header-2 {
    color: #705dcf;
}

span.cm-formatting.cm-formatting-header.cm-formatting-header-3.cm-header.cm-header-3 {
    color: #705dcf;
}

span.cm-formatting.cm-formatting-header.cm-formatting-header-4.cm-header.cm-header-4 {
    color: #705dcf;
}

span.cm-formatting.cm-formatting-header.cm-formatting-header-5.cm-header.cm-header-5 {
    color: #705dcf;
}

span.cm-formatting.cm-formatting-header.cm-formatting-header-6.cm-header.cm-header-6 {
    color: #705dcf;
}

/* Header folder icon */
.CodeMirror-foldgutter-open, .CodeMirror-foldgutter-folded {
    color: #3e3471;
}

.CodeMirror-foldgutter-open, .CodeMirror-foldgutter-folded {
    color: #705dcf;
}

/* Cursor */
.cm-fat-cursor .CodeMirror-cursor {
    background: #3e3471;
}

.cm-animate-fat-cursor {
    background-color: #3e3471;
}

/* Selection in popup ([[]] autocomplete)*/
.suggestion-item.is-selected {
    background-color: #3e3471;
    color: white;
}

.theme-light .suggestion-shortcut {
    color: var(--text-normal);
}

/* Inner and Outer links */
.cm-url {
    color: lightblue!important;
}

.markdown-highlighting .internal-link .cl-underlined-text {
    color: var(--text-accent)!important;
}

.markdown-highlighting .link .cl-underlined-text {
    color: lightblue!important;
}

/* Blockquote */
.preview blockquote {
    background-color: var(--background-modifier-border);
    border: 1px solid var(--text-muted);
}

/* Highlights and Bold */
strong {
    font-size: larger;
    color: var(--text-normal);
}

mark {
    background-color: darkgoldenrod;
}

.markdown-highlighting .tag {
    color: var(--text-accent)!important;
}

/* Tables */
.markdown-preview-view th {
    background-color: #3e3471;
    color: white
}

.cm-s-obsidian pre.HyperMD-table-row span.cm-hmd-table-sep {
    color: unset;
}

.cm-s-obsidian pre.HyperMD-table-row-1 > span {
    color: unset;
}

/* Status bar */
.theme-dark .status-bar-item {
    color: white;
}

.theme-light .status-bar-item {
    color: black;
}

/**/
/* Preview section */
/**/
/* Centered preview */
.markdown-preview-view
{
    padding-left: 10% !important;
    padding-right: 10% !important;
}

.markdown-embed-title {
    color: #705dcf;
}

.markdown-preview-view .markdown-embed {
    background-color: var(--background-primary-alt);
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.markdown-preview-view .internal-link {
    color: #705dcf;
}

.markdown-preview-view a {
    color: lightblue;
}

/**/
/* Side panel section */
/**/
/* Plugin Title and Description */
.plugin-name {
    color: var(--text-normal);
}

.plugin-description {
    color: var(--text-normal)
}

/* Files title and Buttons */
.nav-file-title-content, .nav-folder-title-content {
    color: var(--text-normal);
}

.nav-action-button {
    color: var(--text-normal);
}

/* File explorer navigation selection */
.nav-file.is-active > .nav-file-title, .nav-file.is-active > .nav-folder-title, .nav-file.is-active > .nav-folder-collapse-indicator, .nav-folder.is-active > .nav-file-title, .nav-folder.is-active > .nav-folder-title, .nav-folder.is-active > .nav-folder-collapse-indicator {
    background-color: #3e3471;
    color: white;
}

body:not(.is-grabbing) .nav-file-title:hover, body:not(.is-grabbing) .nav-folder-title:hover {
    background-color: #3e3471;
    color: white;
}

.nav-file-title-content, .nav-folder-title-content {
    color:unset;
}

.nav-folder.mod-root > .nav-file-title:hover, .nav-folder.mod-root > .nav-folder-title:hover {
    color: var(--text-normal);
}

body:not(.is-grabbing) .nav-file-title:hover .nav-folder-collapse-indicator, body:not(.is-grabbing) .nav-folder-title:hover .nav-folder-collapse-indicator {
    background-color: #3e3471;
    color: white;
}

.nav-file-title, .nav-folder-title, .nav-folder-collapse-indicator {
    color: var(--text-normal);
}

/* File explorer menu*/
.menu-item:hover {
    background-color: #3e3471;
    color: white;
}

/* Backlinks Color and Text */
.search-result-file-matched-text {
    background-color: #3e3471;
    color: white;
}

.search-result-file-title {
    color: #705dcf;
}

.search-result-file-matches {
    color: var(--text-normal);
}

.search-result-file-title:hover {
    background-color: #3e3471;
    color: white;
}

.search-result-file-match:hover {
    background-color: #3e3471;
    color: white;
}

/* Folder arrow */
.nav-folder.is-collapsed .nav-folder-collapse-indicator {
    color: #705dcf;
}

.nav-folder-collapse-indicator {
    color: #705dcf;
}

/* Tag Selection */
.tag-pane-tag:hover {
    background-color: #3e3471;
    color: white;
}

.theme-light .tag-pane-tag-count {
    color: var(--text-normal)
}

/* Title */
.side-dock-title {
    color: #705dcf;
}

/* Ribon */
.side-dock-ribbon {
    background-color: #3e3471!important;
    color: var(--text-muted)
}

.side-dock-ribbon-tab, .side-dock-ribbon-action {
    color: white;
}

.theme-dark .side-dock-ribbon-tab.is-active {
    color: white;
}

.theme-dark .side-dock-ribbon-tab.is-before-active {
    color: white;
}

.theme-light .side-dock-ribbon-tab.is-active {
    color: var(--text-normal);
}

.theme-light .side-dock-ribbon-tab.is-before-active {
    color: white;
}

.side-dock-ribbon-tab-inner {
    color: unset;
}

.side-dock-ribbon-before.is-before-active .side-dock-ribbon-tab-inner, .side-dock-ribbon-after.is-after-active .side-dock-ribbon-tab-inner, .side-dock-ribbon-tab.is-before-active .side-dock-ribbon-tab-inner, .side-dock-ribbon-tab.is-after-active .side-dock-ribbon-tab-inner {
    background-color: #3e3471;
}

.side-dock-ribbon-tab, .side-dock-ribbon-before, .side-dock-ribbon-after, .side-dock-ribbon-tab-inner {
    transition: none;
}

/**/
/* Settings panel Section */
/**/
.vertical-tab-nav-item.is-active {
    background-color: #3e3471;
    color:white;
}

.horizontal-tab-nav-item:hover, .vertical-tab-nav-item:hover {
    background-color: #3e3471;
    color: white;
}

.vertical-tab-nav-item.is-active {
    background-color: #3e3471;
}

.vertical-tab-nav-item.is-active {
    border-left-color: #3e3471;
}
