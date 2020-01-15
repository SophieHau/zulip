zrequire('search_pill');
zrequire('util');
zrequire('input_pill');
zrequire('Filter', 'js/filter');
set_global('Handlebars', global.make_handlebars());

const is_starred_item = {
    display_value: 'is:starred',
    description: 'starred messages',
};

const is_private_item = {
    display_value: 'is:private',
    description: 'private messages',
};

run_test('create_item', () => {

    function test_create_item(search_string, current_items, expected_item) {
        const item = search_pill.create_item_from_search_string(search_string, current_items);
        assert.deepEqual(item, expected_item);
    }

    test_create_item('is:starred', [], is_starred_item);
});

run_test('get_search_string', () => {
    assert.equal(search_pill.get_search_string_from_item(is_starred_item), 'is:starred');
});

run_test('append', () => {
    let appended;
    let cleared;

    function fake_append(search_string) {
        appended = true;
        assert.equal(search_string, is_starred_item.display_value);
    }

    function fake_clear() {
        cleared = true;
    }

    const pill_widget = {
        appendValue: fake_append,
        clear_text: fake_clear,
    };

    search_pill.append_search_string(is_starred_item.display_value, pill_widget);

    assert(appended);
    assert(cleared);
});

run_test('get_items', () => {
    const items = [is_starred_item, is_private_item];

    const pill_widget = {
        items: function () { return items; },
    };

    assert.deepEqual(search_pill.get_search_string_for_current_filter(pill_widget),
                     is_starred_item.display_value + ' ' + is_private_item.display_value);
});

run_test('create_pills', () => {
    let input_pill_create_called = false;

    input_pill.create = function () {
        input_pill_create_called = true;
        return {dummy: 'dummy'};
    };

    const pills = search_pill.create_pills({});
    assert(input_pill_create_called);
    assert.deepEqual(pills, {dummy: 'dummy'});
});
