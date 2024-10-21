import { View, Text, StyleSheet } from "react-native";

export const Info = () => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.textTitle}>La Alta Sacerdotisa</Text>
      <Text style={styles.text}>
        {/* Texto largo aquí */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus sunt
        doloremque officiis, doloribus deserunt deleniti unde nemo dolor ipsa
        tenetur nobis harum voluptates vel, facilis possimus velit omnis,
        consequuntur dolore. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Obcaecati ratione rem sit in esse quibusdam iste, consequatur
        omnis fuga accusantium. Porro, laboriosam consectetur quaerat ipsa
        beatae eaque iusto magni vel. Quod facilis natus dolorem necessitatibus
        id, accusamus vitae ipsa! Modi aperiam velit nisi aspernatur quisquam,
        consequatur nulla, voluptatem facere ea, officiis similique excepturi.
        Aspernatur ipsa fuga officia, consequatur magnam non? Voluptatibus
        facilis eaque accusantium dolor ipsam quas quia asperiores voluptate
        cupiditate inventore deleniti possimus, sapiente facere vero!
        Blanditiis, similique consequatur at a dignissimos vero aspernatur
        dolorum expedita ut, fugiat minima. Cum quaerat corporis vero quasi
        mollitia minima ratione accusantium laborum, exercitationem, itaque
        ipsum odio debitis recusandae accusamus, labore quod sunt atque officiis
        harum placeat temporibus provident distinctio pariatur totam! Culpa. Ea
        quas culpa consequuntur tenetur ad voluptatem magni. Quos, dolorem
        officiis esse temporibus, nulla obcaecati fugit mollitia vel ab eos
        cumque earum? Ex suscipit modi, odio pariatur aperiam expedita enim!
        {/* Agrega más texto aquí si lo necesitas */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    gap: 4,
    marginVertical: 30,
    paddingHorizontal: 20,
    marginHorizontal: 17,
    backgroundColor: "purple",
    borderRadius: 20,
  },
  textTitle: {
    padding: 30,
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  text: {
    textAlign: "left",
    fontFamily: "Inter-Light",
    fontSize: 21,
    color: "white",
    lineHeight: 25,
  },
});
