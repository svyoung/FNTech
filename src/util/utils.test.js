import {
    getData,
    addTaxType,
    deleteTaxType,
    sortTaxType
} from './utils';
import { taxDataMock } from '../mocks/dataMock';

describe('getData', () => {
    it("should return fetch data`", async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(taxDataMock)
        }));
        const response = await getData({ pageNum: 1, perPage: 5});
        expect(response.total).toBe(12);
      });
      it("should throw error", async () => {
        global.fetch = jest.fn(() => Promise.reject({
            json: () => Promise.reject(null)
        }));
        const response = await getData({ pageNum: 1, perPage: 5});
        expect(response).toBe(null);
      })
});

describe('addTaxType', () => {
    it('should add type', async () => {
        const addedItem = {
            "id": 34,
            "created": 1698002930,
            "last_edited": 1698002930,
            "name": "dsf",
            "tax_id": "dsf",
            "rate": 324,
            "summit_id": 1,
            "ticket_types": []
        }
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(addedItem)
        }));
        const taxItem = {
            tax_id: "example",
            name: "example",
            rate: 233
        }
        const response = await addTaxType(taxItem);
        expect(response).toBe(addedItem);
    });

    it('should throw error', async () => {
        global.fetch = jest.fn(() => Promise.reject({
            json: () => Promise.reject(null)
        }));

        const taxItem = {
            tax_id: "sdfdsf",
            name: "examplsdfdsfe",
            rate: 233
        }

        const response = await addTaxType(taxItem);
        expect(response).toBe(null);
    });
})

describe('deleteTaxType', () => {
    it('should delete type', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve('')
        }));
        const response = await deleteTaxType(1);
        expect(response).toBe('');
    });
    it('should throw error', async () => {
        global.fetch = jest.fn(() => Promise.reject({
            json: () => Promise.reject(null)
        }));
        const response = await deleteTaxType(1);
        expect(response).toBe(null);
    });

})

describe('sortTaxType', () => {
    it('should sort type', async () => {
        const sorted = [
            taxDataMock.data[3],
            taxDataMock.data[2],
            taxDataMock.data[1],
            taxDataMock.data[0],
        ]
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(sorted)
        }));
        const response = await sortTaxType("name", "+");
        expect(response).toBe(sorted);
    });
    it('should throw error', async () => {
        global.fetch = jest.fn(() => Promise.reject({
            json: () => Promise.reject(null)
        }));
        const response = await sortTaxType("name", "+");
        expect(response).toBe(null);
    });
});