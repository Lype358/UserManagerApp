import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Container,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    bairro: '',
    cidade: '',
    estado: '',
  });
  const [userData, setUserData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex === null) {
      setUserData([...userData, formData]);
    } else {
      const updatedUserData = [...userData];
      updatedUserData[editingIndex] = formData;
      setUserData(updatedUserData);
    }
    setFormData({ nome: '', idade: '', bairro: '', cidade: '', estado: '' });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    const user = userData[index];
    setFormData(user);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUserData = userData.filter((_, i) => i !== index);
    setUserData(updatedUserData);
  };

  useEffect(() => {
    const fakeData = [
      { nome: 'Ana Silva', idade: 25, bairro: 'Centro', cidade: 'São Paulo', estado: 'SP' },
      { nome: 'Carlos Pereira', idade: 34, bairro: 'Jardim Paulista', cidade: 'São Paulo', estado: 'SP' },
      // Outros dados de exemplo...
    ];
    setUserData(fakeData);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Gerenciador de Usuários
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField label="Nome" variant="outlined" name="nome" value={formData.nome} onChange={handleChange} required />
        <TextField label="Idade" variant="outlined" type="number" name="idade" value={formData.idade} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary">
          {editingIndex === null ? 'Enviar' : 'Salvar Alterações'}
        </Button>
      </form>

      {userData.length > 0 && (
        <>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Idade</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.nome}</TableCell>
                    <TableCell>{user.idade}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(index)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(index)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ mt: 2 }}
          />
        </>
      )}
    </Container>
  );
}

export default App;
