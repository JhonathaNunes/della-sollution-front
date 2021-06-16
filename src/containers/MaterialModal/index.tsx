import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import BaseModal from '../BaseModal';
import Material from '../../contracts/models/Material';
import { MaterialFormStyled, ButtonsContainer } from './styled';
import StyledInput from '../../components/StyledInput/style';
import Button from '../../components/Button';
import { createMaterial, updateMaterial } from '../../services/MaterialService';

interface ServiceModalProps {
  onClose: () => void;
  successCallback: () => void;
  isOpen: boolean;
  material?: Material;
}

interface MaterialForm {
  name: string;
  description: string;
  storage?: number;
  uniqueValue: number;
  newItems?: number;
}

const MaterialModal: React.FC<ServiceModalProps> = ({
  onClose,
  successCallback,
  isOpen,
  material,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    unregister,
    setValue,
  } = useForm<MaterialForm>();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [storage, setStorage] = useState<number>();
  const [newItems, setNewItems] = useState<number>();
  const [uniqueValue, setUniqueValue] = useState<number>();

  useEffect(() => {
    if (isOpen && material) {
      setName(material.name);
      setDescription(material.description);
      setStorage(material.storage);
      setNewItems(undefined);
      setUniqueValue(material.uniqueValue);
      setValue('name', material.name);
      setValue('description', material.description);
      setValue('storage', material.storage);
    }
  }, [isOpen]);

  const cleanState = () => {
    setName('');
    setDescription('');
    setStorage(undefined);
    setUniqueValue(undefined);
    setNewItems(undefined);
    setValue('name', '');
    setValue('description', '');
  };

  const handleClose = () => {
    cleanState();
    unregister();
    reset();
    onClose();
  };

  const onSubmit = (form: MaterialForm) => {
    const materialToSend: Material = {
      id: material?.id,
      ...form,
      uniqueValue: +form.uniqueValue,
    };

    if (material) {
      updateMaterial(materialToSend).then(() => {
        successCallback();
      }).catch((err) => {
        switch (err.response.status) {
          case 422:
            toast.error('Um dos campos está incorreto, tente novamente');
            break;
          default:
            toast.error('Houve um erro ao tentar fazer a requisição.'
              + 'Tente novamente mais tarde');
        }
      }).finally(() => {
        handleClose();
      });
    } else {
      createMaterial(materialToSend).then(() => {
        successCallback();
      }).catch((err) => {
        switch (err.response.status) {
          case 422:
            toast.error('Um dos campos está incorreto, tente novamente');
            break;
          default:
            toast.error('Houve um erro ao tentar fazer a requisição.'
              + 'Tente novamente mais tarde');
        }
      })
        .finally(() => handleClose());
    }
  };

  const title = material ? 'Editar material' : 'Cadastrar material';
  const storageOptions = material ? { required: false }
    : { required: 'Campo obrigatírio' };

  return (
    <BaseModal title={title} handleClose={handleClose} isOpen={isOpen}>
      <MaterialFormStyled onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          label="Nome"
          variant="outlined"
          fullWidth
          value={name}
          error={errors.name !== undefined}
          helperText={errors.name && errors.name.message}
          {...register('name', {
            required: 'Campo obrigatório',
          })}
          onChange={(e) => {
            register('name').onChange(e);
            setName(e.target.value);
            setValue('name', e.target.value);
          }}
        />
        <StyledInput
          label="Valor unitário"
          variant="outlined"
          fullWidth
          value={uniqueValue}
          type="number"
          inputProps={{ step: 0.01, max: 999.99 }}
          error={errors.uniqueValue !== undefined}
          helperText={errors.uniqueValue && errors.uniqueValue.message}
          {...register('uniqueValue', {
            required: 'Campo obrigatório',
          })}
          onChange={(e) => {
            register('uniqueValue').onChange(e);
            setUniqueValue(+e.target.value);
            setValue('uniqueValue', +e.target.value);
          }}
        />
        { !material
          ? (
            <StyledInput
              label="Estoque"
              variant="outlined"
              fullWidth
              value={storage}
              type="number"
              inputProps={{ step: 1, max: 10000 }}
              error={errors.storage !== undefined}
              helperText={errors.storage && errors.storage.message}
              {...register('storage', storageOptions)}
              onChange={(e) => {
                register('storage').onChange(e);
                setStorage(+e.target.value);
                setValue('storage', +e.target.value);
              }}
            />
          )
          : (
            <StyledInput
              label="Itens para adicionar"
              variant="outlined"
              fullWidth
              value={newItems}
              type="number"
              inputProps={{ step: 1, max: 10000 }}
              error={errors.newItems !== undefined}
              helperText={errors.newItems && errors.newItems.message}
              {...register('newItems')}
              onChange={(e) => {
                register('newItems').onChange(e);
                setNewItems(+e.target.value);
                setValue('newItems', +e.target.value);
              }}
            />
          )}

        <StyledInput
          label="Descrição"
          variant="outlined"
          fullWidth
          value={description}
          multiline
          rows={5}
          rowsMax={10}
          error={errors.description !== undefined}
          helperText={errors.description && errors.description.message}
          {...register('description', {
            required: 'Campo obrigatório',
          })}
          onChange={(e) => {
            register('description').onChange(e);
            setDescription(e.target.value);
            setValue('description', e.target.value);
          }}
        />
        <ButtonsContainer>
          <Button
            text="Cancelar"
            color="secondary"
            onClick={handleClose}
            type="button"
          />
          <Button text="Salvar" color="primary" type="submit" />
        </ButtonsContainer>
      </MaterialFormStyled>
    </BaseModal>
  );
};

export default MaterialModal;
