import React, { useState, useEffect } from 'react';
import { Typography, Upload } from 'antd';
import * as S from './styles';

interface ImagePickerProps {
    onImageSelect: (file: File) => void; // Agora retorna um arquivo em vez de string
}

const ImagePicker: React.FC<ImagePickerProps> = ({ onImageSelect }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageUpload = (info: any) => {
        const { file } = info;
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Para exibir a imagem
            onImageSelect(file); // Passa o arquivo real, não o objeto com uid
        }
    };

    // Debug para verificar quando o estado muda
    useEffect(() => {
        if (selectedFile) {
            console.log('Novo arquivo armazenado:', selectedFile);
        }
    }, [selectedFile]);

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
                        src={previewUrl || 'assets/images/photo-camera.png'}
                    />
                </S.ContentImg>
            </Upload>
        </div>
    );
};

export default ImagePicker;
