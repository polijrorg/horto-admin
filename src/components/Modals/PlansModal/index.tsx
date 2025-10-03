/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import {
    Modal,
    Input,
    Form,
    InputNumber,
    Button,
    Upload,
    message,
    Select
} from 'antd';
import {
    PlusOutlined,
    DeleteOutlined,
    PictureOutlined
} from '@ant-design/icons';
import { IPlan, IPlanRequest } from 'interfaces/Plans';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

type PlanModalProps = {
    visible: boolean;
    onClose: () => void;
    onSave: (plan: IPlanRequest) => Promise<void>;
    onUpdate: (planId: string, data: IPlanRequest) => Promise<void>;
    plan?: IPlan;
};

const PlanModal: React.FC<PlanModalProps> = ({
    visible,
    onClose,
    onSave,
    onUpdate,
    plan
}) => {
    const [form] = Form.useForm();
    const isEditMode = !!plan;

    useEffect(() => {
        if (plan) {
            const formattedImage: UploadFile[] = plan.image
                ? [
                      {
                          uid: '-1',
                          name: 'image',
                          status: 'done',
                          url: plan.image
                      }
                  ]
                : [];
            form.setFieldsValue({
                ...plan,
                image: formattedImage
            });
        } else {
            form.resetFields();
        }
    }, [form, plan, visible]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const imageFile =
                values.image && values.image[0]
                    ? values.image[0].originFileObj
                    : undefined;

            const planData: IPlanRequest = {
                name: values.name,
                description: values.description,
                price: values.price,
                duration: values.duration,
                checklist: values.checklist,
                subscriptionScope: values.subscriptionScope,
                image: imageFile
            };

            if (isEditMode && plan) {
                await onUpdate(plan.id, planData);
            } else {
                await onSave(planData);
            }
            form.resetFields();
            onClose();
        } catch (error) {
            message.error('Erro ao salvar o plano. Verifique os campos.');
        }
    };

    // Função para tratar o valor do Upload
    const getValueFromEvent = (e: UploadChangeParam) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <Modal
            title={isEditMode ? 'Editar Plano' : 'Criar Plano'}
            open={visible}
            onCancel={onClose}
            onOk={handleOk}
            okText={isEditMode ? 'Atualizar' : 'Criar'}
            cancelText="Cancelar"
        >
            <Form
                layout="vertical"
                form={form}
                initialValues={{ checklist: [''] }}
            >
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
                    getValueFromEvent={getValueFromEvent}
                >
                    <Upload
                        listType="picture"
                        beforeUpload={() => false}
                        maxCount={1}
                        accept=".png,.jpg,.jpeg"
                    >
                        <Button icon={<PictureOutlined />}>
                            Selecionar Imagem
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Checklist de benefícios"
                    name="checklist"
                    rules={[
                        { required: true, message: 'Checklist de benefícios' }
                    ]}
                >
                    <Input.TextArea placeholder="x Nao tem; v Tem;" />
                </Form.Item>
                <Form.Item
                    label="Escopo do Plano"
                    name="subscriptionScope"
                    rules={[
                        {
                            required: true,
                            message: 'Escopo do Plano é obrigatório'
                        }
                    ]}
                >
                    <Select placeholder="Selecione o Escopo do Plano">
                        <Select.Option value="enterprise">
                            Empresa
                        </Select.Option>
                        <Select.Option value="individual">
                            Usuário
                        </Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PlanModal;
