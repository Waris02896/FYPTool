import CreateProjectModal from './Create_Project';
import { useState} from 'react';
function CreateProject() {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCreate = () => {
    console.log('Add project');
    setVisible(false);
  };
  return (
    <div>
      <button type="primary" onClick={showModal}>
        Add Project
      </button>
      <CreateProjectModal
        visible={visible}
        onCancel={handleCancel}
        onCreate={handleCreate}
        
      />
    </div>
  );
}

export default CreateProject;
