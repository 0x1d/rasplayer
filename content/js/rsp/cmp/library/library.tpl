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
          <a href="{{href}}" data-isfolder="{{isFolder}}">
            <div style="height:100%;width:80%;float:left; padding:10px">
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