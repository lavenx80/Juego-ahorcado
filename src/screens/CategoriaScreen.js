import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Boton from '../components/Boton';
import Pantalla from '../components/Pantalla';
import { useApp } from '../context/AppContext';
import { ALEATORIA, CATEGORIAS, NIVELES } from '../data/palabras';

const OPCIONES = [...CATEGORIAS, ALEATORIA];
const contarPalabras = (c) => (c.palabras ? `${Object.values(c.palabras).flat().length} palabras` : 'Todas las categorías');

export default function CategoriaScreen({ navigation }) {
  const { config, colores } = useApp();
  const [categoriaId, setCategoriaId] = useState(null);
  const [nivelId, setNivelId] = useState('facil');
  const nivel = NIVELES.find((n) => n.id === nivelId);

  const tarjeta = ({ item }) => {
    const activa = item.id === categoriaId;
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: activa }}
        onPress={() => setCategoriaId(item.id)}
        style={[
          styles.tarjeta,
          { backgroundColor: colores.superficie, borderColor: activa ? colores.boton : colores.borde },
          activa && styles.tarjetaActiva,
        ]}
      >
        <Text style={styles.icono}>{item.icono}</Text>
        <Text style={[styles.nombre, { color: colores.texto }]}>{item.nombre}</Text>
        <Text style={[styles.detalle, { color: colores.textoSuave }]}>{contarPalabras(item)}</Text>
      </Pressable>
    );
  };

  const selectorNivel = (
    <View style={styles.niveles}>
      <Text style={[styles.titulo, { color: colores.texto }]}>Nivel de dificultad</Text>
      <View style={styles.filaNiveles}>
        {NIVELES.map((n) => {
          const activo = n.id === nivelId;
          return (
            <Pressable
              key={n.id}
              accessibilityRole="button"
              accessibilityState={{ selected: activo }}
              onPress={() => setNivelId(n.id)}
              style={[styles.nivel, { backgroundColor: activo ? colores.boton : colores.superficie, borderColor: activo ? colores.boton : colores.borde }]}
            >
              <Text style={[styles.nombreNivel, { color: activo ? colores.blanco : colores.texto }]}>{n.nombre}</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={[styles.detalle, { color: colores.textoSuave }]}>{nivel.descripcion}</Text>
      <Boton
        titulo={categoriaId ? 'Comenzar' : 'Elige una categoría'}
        icono="▶"
        deshabilitado={!categoriaId}
        onPress={() => navigation.navigate('Juego', { categoriaId, nivelId })}
      />
    </View>
  );

  return (
    <Pantalla estilo={styles.sinPadding}>
      <FlatList
        data={OPCIONES}
        keyExtractor={(c) => c.id}
        renderItem={tarjeta}
        numColumns={2}
        columnWrapperStyle={styles.columnas}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={
          <Text style={[styles.titulo, { color: colores.texto }]}>¡Hola, {config.jugador}! Elige una categoría</Text>
        }
        ListFooterComponent={selectorNivel}
      />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  sinPadding: { padding: 0 },
  lista: { padding: 16, gap: 12 },
  columnas: { gap: 12 },
  titulo: { fontSize: 18, fontWeight: '700' },
  tarjeta: { flex: 1, minHeight: 120, borderRadius: 16, borderWidth: 2, padding: 12, alignItems: 'center', justifyContent: 'center', gap: 4 },
  tarjetaActiva: { borderWidth: 3, transform: [{ scale: 1.02 }] },
  icono: { fontSize: 36 },
  nombre: { fontSize: 16, fontWeight: '700', textAlign: 'center' },
  detalle: { fontSize: 14, textAlign: 'center' },
  niveles: { gap: 10, marginTop: 8 },
  filaNiveles: { flexDirection: 'row', gap: 8 },
  nivel: { flex: 1, minHeight: 48, borderRadius: 12, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  nombreNivel: { fontSize: 16, fontWeight: '700' },
});
