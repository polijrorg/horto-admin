import React, { useState } from 'react';
import { Typography, Upload } from 'antd';
import * as S from './styles';

interface ImagePickerProps {
    onImageSelect: (file: File) => void;
    initialImage?: string | null;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
    onImageSelect,
    initialImage
}) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageUpload = (info: any) => {
        const { file } = info;
        if (file) {
            setPreviewUrl(URL.createObjectURL(file)); // Para exibir a imagem
            onImageSelect(file); // Passa o arquivo real, não o objeto com uid
        }
    };

    return (
        <div>
            <Typography.Title level={5}>Adicionar Imagem</Typography.Title>
            <Upload
                showUploadList={false}
                beforeUpload={() => false} // Impede o upload automático
                onChange={handleImageUpload}
            >
                <S.ContentImg>
                    <S.BannerImg
                        src={
                            previewUrl ||
                            initialImage ||
                            'assets/images/photo-camera.png'
                        }
                    />
                </S.ContentImg>
            </Upload>
        </div>
    );
};

export default ImagePicker;
