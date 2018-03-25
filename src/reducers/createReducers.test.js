import createReducers from "./createReducers";

const setFooActionHandlerMock = jest.fn();

const aReducerConfig = {
    initialState: { foo: "bar" },
    SET_FOO: setFooActionHandlerMock
};

const aReducer = createReducers({ test: aReducerConfig }).test;

afterEach(() => {
    setFooActionHandlerMock.mockClear();
});

describe("createReducers tests", () => {
    test("returns initialState", () => {
        const newState = aReducer(undefined, {});
        expect(newState).toEqual(aReducerConfig.initialState);
    });
    test("calls appropriate action handler", () => {
        const aPayload = { foo: "baz" };
        aReducer(undefined, { type: "SET_FOO", payload: aPayload });
        expect(setFooActionHandlerMock.mock.calls.length).toBe(1);
        expect(setFooActionHandlerMock.mock.calls[0][0]).toBe(
            aReducerConfig.initialState
        );
        expect(setFooActionHandlerMock.mock.calls[0][1]).toEqual(aPayload);
    });
});
