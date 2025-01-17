import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    objectFit: 'cover',
  },
});

const VisitorPDF = ({ visitor }) => (
  <Document>
    <Page style={styles.page} size={'A4'}>
      <View style={styles.section}>
        <Text>Name: {visitor.name}</Text>
      </View>
      <View style={styles.section}>
        <Text>Mobile Number: {visitor.mobile_number}</Text>
      </View>
      <View style={styles.section}>
        <Text>Purpose of Meet: {visitor.purpose_of_meet}</Text>
      </View>
      <View style={styles.section}>
        <Text>Status: {visitor.status}</Text>
      </View>
      <View style={styles.section}>
        <Text>Visited: {visitor.visited}</Text>
      </View>
      {visitor.photo && (
        <View style={styles.section}>
          <Image
            style={styles.image}
            src={`http://localhost:3000${visitor.photo}`} // Ensure this path is correct
          />
        </View>
      )}
    </Page>
  </Document>
);

export default VisitorPDF;
