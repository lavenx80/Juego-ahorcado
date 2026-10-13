import { useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import Boton from '../components/Boton';
import Pantalla from '../components/Pantalla';
import { useApp } from '../context/AppContext';

export default function InicioScreen({ navigation }) {
  const { config, colores, actualizarConfig } = useApp();
  const [nombre, setNombre] = useState(config.jugador);
  const [error, setError] = useState('');

  const jugar = () => {
    const limpio = nombre.trim();
    if (!limpio) {
      setError('Escribe tu nombre para poder jugar.');
      return;
    }
    actualizarConfig({ jugador: limpio });
    navigation.navigate('Categoria');
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.flex}>
      <Pantalla scroll edges={['top', 'bottom']} fondo={colores.encabezado} estilo={styles.contenido}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.titulo}>El Ahorcado</Text>
        <Text style={styles.subtitulo}>Adivina palabras de Colombia letra por letra</Text>

        <View style={[styles.tarjeta, { backgroundColor: colores.superficie }]}>
          <Text style={[styles.etiqueta, { color: colores.texto }]}>Nombre del jugador</Text>
          <TextInput
            value={nombre}
            onChangeText={(texto) => {
              setNombre(texto);
              setError('');
            }}
            placeholder="Ej: Lina"
            placeholderTextColor={colores.textoSuave}
            maxLength={20}
            returnKeyType="go"
            onSubmitEditing={jugar}
            style={[styles.input, { color: colores.texto, borderColor: error ? colores.fallo : colores.borde }]}
          />
          {error ? <Text style={[styles.error, { color: colores.fallo }]}>{error}</Text> : null}
          <Boton titulo="Jugar" icono="▶" onPress={jugar} />
        </View>

        <Boton titulo="Instrucciones" icono="📖" variante="secundario" onPress={() => navigation.navigate('Instrucciones')} />
        <Boton titulo="Estadísticas" icono="📊" variante="secundario" onPress={() => navigation.navigate('Estadisticas')} />
        <Boton titulo="Configuración" icono="⚙️" variante="secundario" onPress={() => navigation.navigate('Configuracion')} />
      </Pantalla>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  contenido: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logo: { width: 110, height: 110, borderRadius: 26, alignSelf: 'center' },
  titulo: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', textAlign: 'center' },
  subtitulo: { fontSize: 15, color: '#C9D6EA', textAlign: 'center', marginBottom: 8 },
  tarjeta: { borderRadius: 18, padding: 16, gap: 10 },
  etiqueta: { fontSize: 15, fontWeight: '700' },
  input: { minHeight: 50, borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 14, fontSize: 17 },
  error: { fontSize: 14 },
});
