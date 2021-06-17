import React, { useEffect, useState } from 'react';
import { InputLabel, MenuItem, TextField } from '@material-ui/core';
import { toast } from 'react-toastify';
import Service from '../../contracts/models/Service';
import {
  EditService, ServiceRow, StyledFormControl, ButtonContainer, MaterialRow,
} from './style';
import { getMaterial } from '../../services/MaterialService';
import Material from '../../contracts/models/Material';
import StyledSelect from '../StyledSelect/style';
import Button from '../Button';
import { addMaterials } from '../../services/OrdersService';

interface ServiceEditProps {
  service: Service;
  finished: boolean;
}

interface MaterialField {
  materialId?: number;
  materialQtd?: number;
  added?: boolean;
}

const ServiceEdit: React.FC<ServiceEditProps> = ({ service, finished }) => {
  const [materials, setMaterials] = useState<Material[]>();
  const [hoursWorked, setHoursWorked] = useState<number>();
  const [materialFields, setMaterialFields] = useState<MaterialField[]>([]);

  const listMaterials = () => {
    getMaterial()
      .then((response) => {
        const materialsList = response.data.map((data: any) => ({
          ...data,
          uniqueValue: +data.unique_value,
        }));

        setMaterials(materialsList);
      });
  };

  const addMaterial = () => {
    const params = {
      hours_worked: hoursWorked,
      new_materials: materialFields.filter((el) => !el.added).map((el) => (
        { id: el.materialId, qtd: el.materialQtd }
      )),
    };

    addMaterials(service.osId ?? -1, params)
      .then(() => {
        const materialsF = materialFields.map((el) => {
          const m = el;
          m.added = true;
          return m;
        });

        setMaterialFields(materialsF);
        toast.success('Materias e horas cadastradas com sucesso');
      })
      .catch(() => {
        toast.error('Houve um erro ao atualizar esse serviço');
      });
  };

  const addField = () => {
    const fields = [...materialFields];
    fields.push({});
    setMaterialFields(fields);
  };

  const handleMaterialSelectedChange = (index: number, value: number) => {
    const values = [...materialFields];
    values[index].materialId = value;
    setMaterialFields(values);
  };

  const handleMaterialQtdChange = (index: number, value: number) => {
    const values = [...materialFields];
    values[index].materialQtd = value;
    setMaterialFields(values);
  };

  useEffect(() => {
    listMaterials();
    setHoursWorked(service.hoursWorked);
    const defaultMaterials = service.materials?.map((m) => {
      const mf: MaterialField = {
        materialId: m.id,
        materialQtd: m.qtd,
        added: true,
      };

      return mf;
    });
    setMaterialFields(defaultMaterials ?? []);
  }, []);

  return (

    <EditService>
      <ServiceRow>
        <h3>{service.name}</h3>
        <TextField
          label="H. trabalhadas"
          variant="outlined"
          style={{ width: '20%' }}
          type="number"
          inputProps={{ min: 0 }}
          value={hoursWorked}
          disabled={finished}
          onChange={(e) => {
            setHoursWorked(+e.target.value);
          }}
        />
      </ServiceRow>
      {materialFields.map((field, index) => (
        <MaterialRow>
          <StyledFormControl variant="outlined" style={{ width: '75%' }}>
            <InputLabel id="materialLabel">Material</InputLabel>
            <StyledSelect
              labelId="materialLabel"
              fullWidth
              value={field.materialId}
              type="number"
              disabled={field.added}
              inputProps={{ min: 0 }}
              onChange={(e) => {
                handleMaterialSelectedChange(index, e.target.value as number);
              }}
            >
              {materials?.map((material) => (
                <MenuItem value={material.id}>{material.name}</MenuItem>
              ))}
            </StyledSelect>
          </StyledFormControl>
          <TextField
            label="Qtd"
            variant="outlined"
            style={{ width: '20%' }}
            type="number"
            inputProps={{ min: 0 }}
            value={field.materialQtd}
            disabled={field.added}
            onChange={(e) => {
              handleMaterialQtdChange(index, +e.target.value);
            }}
          />
        </MaterialRow>
      ))}
      {!finished
        && (
          <ButtonContainer>
            <Button
              text="Adicionar material"
              color="secondary"
              onlyText
              onClick={() => addField()}
            />
            <Button
              text="Salvar"
              color="primary"
              onClick={() => addMaterial()}
            />
          </ButtonContainer>
        )}
    </EditService>
  );
};

export default ServiceEdit;
