$(function() {
    // 全部屋の予約情報を取得
    // error 系をハンドリングするには $.ajax を使用する必要がある
    var url = '/reservations';
    var data = {
        date: '2012-04-01'
    };
    $.getJSON(url, data, function(reservations) {
        // 取得できた場合予約状況欄を初期化
        $('.room .statuses dd').text('空き');
        // 予約状況欄に予約者名を記載
        for (var i = 0; i < reservations.length; i++) {
            var roomId = reservations[i].roomId;
            var division = reservations[i].division;
            var reserver = reservations[i].reserver;
            $('#' + roomId + ' .' + division + ' dd').text(reserver);
        }
    });
});

function reserve() {
    // TODO 各部屋への対応
    var data = {
        date: '2012-04-01',
        roomId: 'seminar_room_a',
        division: 'morning',
        reserver: 'mohya'
    }
    $.post('/reservations', data, function() {
        $('#' + data.roomId + ' .' + data.division + ' dd').text(data.reserver);
    });
}