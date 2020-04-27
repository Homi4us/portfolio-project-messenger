import React, { Component } from 'react'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined, InboxOutlined, FileImageFilled  } from '@ant-design/icons';
import './index.css'
import cookie from 'react-cookies'
import { observable } from 'mobx';
import store from '../../../../../../store'


const props = {
    name: 'imageFile',
    method: 'post',
    action: '/imageUpload/',
    headers: { Authorization: "Bearer " + cookie.load('jwt_token') },
    multiple: false,
    beforeUpload(file){
        console.log(file)
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`Файл ${info.file.name} успешно загружен`);
        store.account.isLoaded = false;
        store.account.getData();
      } else if (status === 'error') {
        message.error(`${info.file.name} Ошибка! Файл не загружен.`);
      }
    },
  };

export default class Uploader extends Component {

    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className = "upload-block">
                    <Upload {...props}
                            listType="picture-card"
                            className="avatar-uploader">
                                <div class = "svg-upload">
                            <InboxOutlined />
                            </div>
                            <h3>Выбери картинку для загрузки</h3>

                    </Upload>
                    </div>
        )
    }
}
