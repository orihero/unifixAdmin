import React from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {url} from '../../../api/api'

class TinyEditor extends React.Component {
    handleEditorChange = (e) => {
        let {
            onChange = () => {
            }
        } = this.props;
        onChange(e.target.getContent());
    };

    render() {
        return (
            <Editor
                apiKey='5ybiipbkrnrkub66b9ea3awg4jjcvhghgzspmmsmnaarua3h'
                cloudChannel='dev'
                initialValue={this.props.initialValue}
                init={{
                    plugins: 'print  preview fullpage powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap mentions linkchecker emoticons',
                    imagetools_cors_hosts: ['picsum.photos'],
                    tinydrive_token_provider: `${url}/mce-jwt`,
                    tinydrive_google_drive_key: 'AIzaSyAsVRuCBc-BLQ1xNKtnLHB3AeoK-xmOrTc',
                    tinydrive_google_drive_client_id: '748627179519-p9vv3va1mppc66fikai92b3ru73mpukf.apps.googleusercontent.com',
                    menubar: 'file edit view insert format tools table tc help',
                    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
                    autosave_ask_before_unload: true,
                    autosave_interval: "30s",
                    autosave_prefix: "{path}{query}-{id}-",
                    autosave_restore_when_empty: false,
                    autosave_retention: "2m",
                    image_advtab: true,
                    content_css: [
                        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                        '//www.tiny.cloud/css/codepen.min.css'
                    ],
                    // language: 'ru',
                    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                    height: 600,
                    image_caption: true,
                    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                    noneditable_noneditable_class: "mceNonEditable",
                    toolbar_drawer: 'sliding',
                    spellchecker_dialog: true,
                    spellchecker_whitelist: ['Ephox', 'Moxiecode'],
                    tinycomments_mode: 'embedded',
                    contextmenu: "link image imagetools table configurepermanentpen",
                    content_style: '.mce-annotation { background: #fff0b7; } .tc-active-annotation {background: #ffe168; color: black; } .tox-tinymce {height:600px}'
                }}
                onChange={this.handleEditorChange}
            />
        );
    }
}

export default TinyEditor;
