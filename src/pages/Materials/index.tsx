import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import MainNavBar from '../../components/MainNavBar';
import { PageContainer, PageBody } from '../../containers/PageContainer/styled';
import Header from '../../components/Header';
import Material from '../../contracts/models/Material';
import { deleteMaterial, getMaterial } from '../../services/MaterialService';
import MaterialContainer from '../../containers/MaterialContainer';
import MaterialModal from '../../containers/MaterialModal';

const Materials: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [materialModal, setMaterialModal] = useState<Material>();

  const listMaterials = () => {
    setLoading(true);

    getMaterial()
      .then((response) => {
        const materialsList = response.data.map((data: any) => ({
          ...data, uniqueValue: +data.unique_value,
        }));

        setMaterials(materialsList);
      })
      .catch(() => {
        toast.error('Houve um erro ao carregar os materiais');
      })
      .finally(() => setLoading(false));
  };

  const delMaterial = (id: number) => {
    deleteMaterial(id)
      .then(() => listMaterials())
      .catch(() => {
        toast.error('Não foi possível deletar este material!');
      });
  };

  const openEditModal = (material: Material) => {
    setModalOpen(true);
    setMaterialModal(material);
  };

  const closeModal = () => {
    setModalOpen(false);
    setMaterialModal(undefined);
  };

  useEffect(() => {
    listMaterials();
  }, []);

  return (
    <>
      <MainNavBar />
      <PageContainer>
        <Header title="Materiais" action={() => setModalOpen(true)} />
        {isLoading ? (
          <div
            className="spinner-container"
            style={{ height: 'calc(100vh - 75px)' }}
          >
            <CircularProgress />
          </div>
        ) : (
          <PageBody>
            <MaterialContainer
              materials={materials}
              viewClick={openEditModal}
              deleteClick={delMaterial}
            />
          </PageBody>
        )}
      </PageContainer>
      <MaterialModal
        material={materialModal}
        onClose={closeModal}
        successCallback={listMaterials}
        isOpen={modalIsOpen}
      />
    </>
  );
};

export default Materials;
