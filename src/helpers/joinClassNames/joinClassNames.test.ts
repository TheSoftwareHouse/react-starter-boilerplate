import joinClassNames from './joinClassNames';

test('joins any number of arguments with a space character', () => {
    expect(joinClassNames('foo', 'bar', 'baz')).toEqual('foo bar baz');
    expect(joinClassNames('foo', 'bar')).toEqual('foo bar');
    expect(joinClassNames('foo')).toEqual('foo');
    expect(joinClassNames()).toEqual('');
});

test('ignores empty strings', () => {
    expect(joinClassNames('foo', '', 'baz')).toEqual('foo baz');
});

test('ignores non-string arguments', () => {
    expect(joinClassNames(1, null, 'foo', undefined, {}, 'baz', false, true)).toEqual('foo baz');
});