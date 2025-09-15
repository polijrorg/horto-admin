import React, { useEffect } from 'react';
import {
    Modal,
    Input,
    Form,
    InputNumber,
    Button,
    Upload,
    message,
    Space
} from 'antd';
import {
    PlusOutlined,
    DeleteOutlined,
    PictureOutlined
} from '@ant-design/icons';
import { IPlan, IPlanRequest } from 'interfaces/Plans';
import { UploadProps } from 'antd/lib/upload/interface';

type PlanModalProps = {
    visible: boolean;
    onClose: () => void;
    onSave: (plan: IPlanRequest) => void;
    onUpdate: (planId: string, data: IPlanRequest) => void;
    plan?: IPlan;
};

const PlanModal = ({
    visible,
    onClose,
    onSave,
    onUpdate,
    plan
}: PlanModalProps) => {
    const [form] = Form.useForm();

    const isEditMode = !!plan;

    useEffect(() => {
        if (plan) {
            form.setFieldsValue({
                name: plan.name,
                description: plan.description,
                price: plan.price,
                duration: plan.duration,
                image: plan.image
                    ? [
                          {
                              uid: '-1',
                              name: plan.image,
                              status: 'done',
                              url: plan.image
                          }
                      ]
                    : [],
                checklist: plan.checklist ? plan.checklist.split('@#@') : []
            });
        } else {
            form.resetFields();
        }
    }, [form, plan, visible]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const benefitsString = values.checklist.join('@#@');

            const imageUrl =
                values.image && values.image[0]
                    ? values.image[0].url || values.image[0].response?.url
                    : '';

            const planData: IPlanRequest = {
                name: values.name,
                description: values.description,
                price: values.price,
                duration: values.duration,
                image: imageUrl,
                checklist: benefitsString
            };

            if (isEditMode && plan) {
                onUpdate(plan.id, planData);
            } else {
                onSave(planData);
            }

            onClose();
        } catch (error) {
            // Erros de validação já são exibidos automaticamente pelo Form
        }
    };

    const uploadProps: UploadProps = {
        name: 'file',
        action: 'https://seuservidor.com/api/upload-image', // Substitua esta URL
        listType: 'picture',
        maxCount: 1,
        onChange(info: any) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} uploaded successfully.`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} upload failed.`);
            }
        },
        beforeUpload: (file: File) => {
            const isJpgOrPng =
                file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must be smaller than 2MB!');
            }
            return isJpgOrPng && isLt2M;
        }
    };

    return (
        <Modal
            title={isEditMode ? 'Editar Plano' : 'Criar Plano'}
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    {isEditMode ? 'Atualizar Plano' : 'Criar Plano'}
                </Button>
            ]}
            // Adiciona a propriedade bodyStyle para habilitar a rolagem
            bodyStyle={{ maxHeight: 400, overflowY: 'auto' }}
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    label="Nome do Plano"
                    name="name"
                    rules={[
                        { required: true, message: 'Digite o nome do plano' }
                    ]}
                >
                    <Input placeholder="Digite o nome" />
                </Form.Item>

                <Form.Item
                    label="Descrição"
                    name="description"
                    rules={[{ required: true, message: 'Digite a descrição' }]}
                >
                    <Input.TextArea placeholder="Digite a descrição" />
                </Form.Item>

                <Form.Item
                    label="Preço"
                    name="price"
                    rules={[{ required: true, message: 'Digite o preço' }]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: '100%' }}
                        placeholder="Digite o preço"
                    />
                </Form.Item>

                <Form.Item
                    label="Duração (dias)"
                    name="duration"
                    rules={[{ required: true, message: 'Digite a duração' }]}
                >
                    <InputNumber
                        min={1}
                        style={{ width: '100%' }}
                        placeholder="Digite a duração"
                    />
                </Form.Item>

                <Form.Item
                    label="Imagem do Plano"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) =>
                        Array.isArray(e) ? e : e && e.fileList
                    }
                >
                    <Upload {...uploadProps}>
                        <Button icon={<PictureOutlined />}>
                            Selecionar Imagem
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.List
                    name="checklist"
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names || names.length === 0) {
                                    return Promise.reject(
                                        new Error(
                                            'Adicione pelo menos um benefício'
                                        )
                                    );
                                }
                                // Fix do erro: Retorne um Promise.resolve() se a validação passar
                                return Promise.resolve();
                            }
                        }
                    ]}
                >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}
                                    style={{ display: 'flex', marginBottom: 8 }}
                                    align="baseline"
                                >
                                    <Form.Item
                                        {...restField}
                                        name={name}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Digite o benefício'
                                            }
                                        ]}
                                    >
                                        <Input placeholder="Digite um benefício" />
                                    </Form.Item>
                                    <DeleteOutlined
                                        onClick={() => remove(name)}
                                    />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    Adicionar Benefício
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    );
};

PlanModal.defaultProps = {
    plan: undefined
};

export default PlanModal;
