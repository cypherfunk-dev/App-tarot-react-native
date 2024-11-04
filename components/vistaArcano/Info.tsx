import { View, Text, StyleSheet } from "react-native";

export const Info = () => {
  return (
    <View style={styles.textContainer}>
      <Text className="p-4 text-center text-2xl">La Alta Sacerdotisa</Text>
      <Text className="p-4 text-xl">
        La carta de "La Papisa" (o "La Sacerdotisa") es la segunda carta de los
        Arcanos Mayores en el tarot y representa sabiduría, intuición,
        conocimiento oculto y espiritualidad. En la imagen típica de esta carta,
        se muestra a una mujer sentada en un trono, generalmente vestida con un
        manto azul y rodeada de simbolismo religioso o espiritual. ###
        Descripción visual: 1. **Personaje central**: La figura femenina es
        solemne, calmada y de expresión introspectiva, a menudo con un libro o
        pergamino en su regazo, simbolizando conocimiento oculto o secreto. 2.
        **Vestimenta**: La Papisa suele llevar una túnica azul o blanca y un
        velo que cubre parcialmente su cabeza, lo cual representa pureza,
        serenidad y conexión con lo espiritual. 3. **Símbolos de poder y
        sabiduría**: - **Libro o pergamino**: Representa el conocimiento
        esotérico y la sabiduría que no se revela a todos, sino solo a quienes
        buscan comprender a un nivel más profundo. - **Pilares**: A menudo, está
        flanqueada por dos pilares (a veces etiquetados como "B" y "J",
        aludiendo a Boaz y Jakin del Templo de Salomón), que simbolizan el
        equilibrio entre lo consciente y lo inconsciente, la luz y la oscuridad.
        - **Luna creciente**: Puede aparecer a sus pies o en su tocado,
        simbolizando la intuición, el misterio y el poder femenino. 4. **Color y
        ambiente**: Los colores suelen ser fríos, como azul y blanco, que evocan
        calma y sabiduría espiritual. En algunos mazos, se ve un fondo oscuro o
        estrellado, que representa los misterios del cosmos. ### Simbolismo de
        La Papisa La Papisa es un arquetipo de sabiduría oculta y percepción
        intuitiva. En una lectura de tarot, su aparición suele sugerir la
        necesidad de confiar en la intuición, de explorar el conocimiento
        espiritual o de respetar los secretos. También puede simbolizar
        paciencia, la necesidad de esperar el momento adecuado para actuar o
        explorar el inconsciente.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexGrow: 1,
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },
});
//   textTitle: {
//     padding: 30,
//     fontFamily: "Inter-Bold",
//     fontSize: 24,
//     color: "black",
//     textAlign: "center",
//   },
//   text: {
//     textAlign: "left",
//     fontFamily: "Inter-Light",
//     fontSize: 21,
//     color: "black",
//     lineHeight: 25,
//   },
// });
