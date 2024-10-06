import React, { FC } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    margin: 20,
    padding: 10,
    alignItems: "flex-end",
  },
  billSection: {
    margin: "30 30 10 30",
    flexDirection: "row",
    gap: 20,
  },

  dividerBillSection: {
    padding: "0 30",
  },
  dividerTotalBillSection: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: "0 30",
  },
  text: {
    fontSize: 10,
  },

  divider: {
    marginTop: 20,
    border: "1px solid gray",
  },
  dividerBill: {
    border: "1px solid gray",
  },
  dividerTotal: {
    width: "43%",
    border: "1px solid gray",
  },
  addressOffset: {
    marginLeft: 58,
    gap: 2,
    position: "relative",
    bottom: 12,
    left: 20,
  },
  billOffset: {
    marginLeft: 68,
    gap: 2,
    position: "relative",
    bottom: 23,
    left: 30,
  },
  displayEnd: {
    alignItems: "flex-end",
  },
  billHeader: {
    flexDirection: "row",
    margin: "10 30 10 30",
    gap: 20,
  },
  billHeaderText: {
    width: 40,
    fontSize: 10,
    textAlign: "center",
  },
  subTotalHeader: {
    width: 70,
    fontSize: 10,
    position: "relative",
    left: 20,
  },
  totalHeader: {
    width: 90,
    fontSize: 10,
    position: "relative",
    left: 40,
    fontWeight: "bold",
  },
  billContent: {
    flexDirection: "row",
    margin: "10 30 10 30",
    gap: 20,
  },
  subTotalContainer: {
    flexDirection: "row",
    margin: "10 30 10 30",
    justifyContent: "space-between",
  },
});

const TextArea: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={styles.text}>{children}</Text>
);
const BillHeader: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={styles.billHeaderText}>{children}</Text>
);
const SubTotal: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={styles.subTotalHeader}>{children}</Text>
);
const Total: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={styles.totalHeader}>{children}</Text>
);

// Create Document Component
const MyDocument = () => (
  <>
    <Document>
      <Page size="A4">
        <View style={styles.page}>
          <View style={styles.section}>
            <TextArea>BC TRANSPORT</TextArea>
          </View>
          <View style={styles.section}>
            <TextArea>16 RUE MARIA CALLAS - 93000 BOBIGNY</TextArea>
            <TextArea>N° SIREN / SIRET :98112564400014</TextArea>
            <TextArea>N° TVA: FR20981125644</TextArea>
            <TextArea>N° TVA UE : FR20 981 125 644</TextArea>
            <TextArea>E-mail: bctransport93@gmail.com</TextArea>
            <TextArea>Téléphone: +33625279572</TextArea>
          </View>
        </View>

        <View>
          <Text style={styles.divider} />
        </View>

        {/*  */}
        <View style={styles.page}>
          <View style={styles.billSection}>
            <View>
              <TextArea>Destinataire:</TextArea>
            </View>
            <View>
              <TextArea>Abd Rahmane YACINE</TextArea>
              <TextArea>1 ALLEE DE LA TOUR</TextArea>
              <TextArea>93250 Villemomble</TextArea>
              <TextArea>France</TextArea>
            </View>
          </View>
          <View style={styles.billSection}>
            <View style={styles.displayEnd}>
              <TextArea>Facture:</TextArea>
              <TextArea>Date de facturation:</TextArea>
            </View>
            <View style={styles.displayEnd}>
              <TextArea>10</TextArea>
              <TextArea>10/10/2024</TextArea>
            </View>
          </View>
        </View>
        <View style={styles.dividerBillSection}>
          <Text style={styles.dividerBill} />
        </View>

        {/*  */}
        <View style={styles.page}>
          <View style={styles.billHeader}>
            <TextArea>Description</TextArea>
          </View>
          <View style={styles.billHeader}>
            <BillHeader>Quantité</BillHeader>
            <BillHeader>Unité</BillHeader>
            <BillHeader>Prix</BillHeader>
            <BillHeader>TVA</BillHeader>
            <BillHeader>Montant</BillHeader>
          </View>
        </View>
        <View style={styles.dividerBillSection}>
          <Text style={styles.dividerBill} />
        </View>

        {/*  */}
        <View style={styles.page}>
          <View style={styles.billContent}>
            <TextArea>Transfert Drancy Aeroport</TextArea>
          </View>
          <View style={styles.billContent}>
            <BillHeader>1</BillHeader>
            <BillHeader>Pièce</BillHeader>
            <BillHeader>40</BillHeader>
            <BillHeader>20%</BillHeader>
            <BillHeader>48</BillHeader>
          </View>
        </View>
        {/*  */}
        <View style={styles.page}>
          <View style={styles.billContent}>
            <TextArea>Early Pickup</TextArea>
          </View>
          <View style={styles.billContent}>
            <BillHeader>1</BillHeader>
            <BillHeader>Pièce</BillHeader>
            <BillHeader>40</BillHeader>
            <BillHeader>20%</BillHeader>
            <BillHeader>48</BillHeader>
          </View>
        </View>
        <View style={styles.dividerBillSection}>
          <Text style={styles.dividerBill} />
        </View>
        {/*  */}
        <View style={styles.page}>
          <View style={styles.billContent}></View>
          <View style={styles.billContent}>
            <BillHeader>{""}</BillHeader>
            <SubTotal>Sous-total HT</SubTotal>
            <BillHeader>{""}</BillHeader>
            <BillHeader>{""}</BillHeader>
            <BillHeader>48</BillHeader>
          </View>
        </View>
        {/*  */}
        <View style={styles.page}>
          <View style={styles.billContent}></View>
          <View style={styles.billContent}>
            <BillHeader>{""}</BillHeader>
            <SubTotal>TVA 20%</SubTotal>
            <BillHeader>{""}</BillHeader>
            <BillHeader>{""}</BillHeader>
            <BillHeader>48</BillHeader>
          </View>
        </View>
        {/*  */}
        <View style={styles.page}>
          <View style={styles.billContent}></View>
          <View style={styles.billContent}>
            <BillHeader>{""}</BillHeader>
            <Total>Montant Total EUR</Total>
            <BillHeader>{""}</BillHeader>
            <BillHeader>{""}</BillHeader>
            <BillHeader>48</BillHeader>
          </View>
        </View>
        {/* Total Divider */}
        <View style={styles.dividerTotalBillSection}>
          <Text style={styles.dividerTotal} />
        </View>
      </Page>
    </Document>
  </>
);

export default MyDocument;
