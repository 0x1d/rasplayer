<div id="rsp-library">
  <table width="100%">
    <thead>
      <tr>
        <th>{{parent}}</th>
      </tr>
    </thead>
    <tbody>
      {{#folder}}
        <tr>
          <td>
            <a href="{{href}}" class="rsp-library-item" data-isfolder="{{isFolder}}">
              <div>
                {{text}}
              </div>
            </a>
            <button class="rsp-item-queue folder-{{isFolder}}" data-href="{{href}}" data-isfolder="{{isFolder}}" value="Queue">
              Queue
            </button>
          </td>
        </tr>
      {{/folder}}
    </tbody>
  </table>
</div>